import {
  APIGatewayProxyHandler,
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
} from "aws-lambda";
import "source-map-support/register";
import { LambdaLog } from "lambda-log";
import { validateSignature } from "./validateSignature";
import { ResponseType, getResponseByType } from "./responses";
import { processGitHubEvent } from "./eventHandlers/processGitHubEvent";
import { parseRequestBody, ParsedGithubEvent } from "./parseRequestBody";

const log: LambdaLog = new LambdaLog();

export const processGithubEvent = async (
  event: APIGatewayProxyEvent,
  logInstance = log
): Promise<APIGatewayProxyResult> => {
  try {
    //Authenticate to make sure the request is from Github
    const isAuthenticated =
      event.headers["X-Hub-Signature-256"] &&
      event.body &&
      validateSignature(
        event.headers["X-Hub-Signature-256"].toString(),
        event.body!.toString()
      );

    if (!isAuthenticated) {
      return getResponseByType(ResponseType.Unauthorized);
    }

    //Parse the request payload
    const parsedGitHubEvent = parseRequestBody(event.body!);

    if (!parsedGitHubEvent.isParsed) {
      return getResponseByType(ResponseType.InvalidPayload);
    } else {
      //process the request based on the event types
      const eventType = event.headers["X-GitHub-Event"]!.toString();
      processGitHubEvent(eventType, parsedGitHubEvent.payload);
    }

    return getResponseByType(ResponseType.Success);
  } catch (err) {
    logInstance.error(`Error processing the Github event: ${err}`);
    return getResponseByType(ResponseType.DefaultError);
  }
};

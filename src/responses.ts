import { APIGatewayProxyResult } from "aws-lambda";

/* Possible API Responses */
export enum ResponseType {
  Success,
  Unauthorized,
  InvalidPayload,
  DefaultError,
}

/**
 * Final response for the lambda is handled by this method
 * @param {ResponseType} responseType - ResponseType
 * @param {any} [args] - any
 * @returns an object with a status code, body, and headers.
 */
export function getResponseByType(
  responseType: ResponseType,
  args?: any
): APIGatewayProxyResult {
  const generateResponse = (code: number, body: any): APIGatewayProxyResult => {
    const result: APIGatewayProxyResult = {
      statusCode: code,
      body: JSON.stringify(body),
    };
    result.headers = {
      ...result.headers,
      "Access-Control-Allow-Credentials": true,
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type,Accept",
    };
    return result;
  };
  switch (responseType) {
    case ResponseType.Success:
      return generateResponse(200, { message: "Event Accepted." });
    case ResponseType.Unauthorized:
      return generateResponse(401, { message: "Unauthorized Access." });
    case ResponseType.InvalidPayload:
      return generateResponse(400, { message: "Invalid Payload" });
    case ResponseType.DefaultError:
      return generateResponse(500, { message: "Unexpected error occured." });
  }

  throw new Error(
    `Unknown ResponseType: ${responseType}\n and/or Args : ${JSON.stringify(
      args
    )}`
  );
}

import { SSM } from "aws-sdk";
import { promises } from "dns";

type GitHubSecretKey = { SECRET_KEY: String };

/**
 * It gets the secret key from the SSM parameter store.
 */
export const getGitHubSecretKey = async (): Promise<string> => {
  const ssm = new SSM();
  const paramName = `/${process.env["ENV"]}/Github-events-ingester`;

  const result = await ssm
    .getParameter({ Name: paramName, WithDecryption: true })
    .promise();

  if (!result?.Parameter?.Value) {
    throw Error(
      `Unexpected parameter value :\n${JSON.stringify(result, null, 2)}`
    );
  }

  let key = JSON.parse(result.Parameter.Value);

  return key.SECRET_KEY;
};

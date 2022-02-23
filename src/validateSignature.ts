import { getGitHubSecretKey } from "./aws/getGitHubSecretKey";
import * as crypto from "crypto";

/**
 * It validates the signature of the request.
 * @param {string} signature - The signature header sent by GitHub.
 * @param {string} body - The body of the request.
 * @returns true when Authenticated
 */
export const validateSignature = async (
  signature: string,
  body: string
): Promise<boolean> => {
  try {
    const SECRET_KEY = await getGitHubSecretKey();
    const expectedSignature =
      "sha1=" +
      crypto
        .createHmac("SHA1", SECRET_KEY)
        .update(JSON.stringify(body))
        .digest("hex");
    console.log(expectedSignature);
    if (signature !== expectedSignature) {
      return false;
    }
    return true;
  } catch (err) {
    throw Error(`Error validating signature`);
  }
};

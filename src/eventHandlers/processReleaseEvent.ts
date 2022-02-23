import { publishToSNS } from "../aws/snsPublisher";
import { ReleaseEventPayload } from "../types/ReleaseEventPayload";

/**
 * It processes the payload and publishes the release-event to the SNS topic.
 * @param {ReleaseEventPayload} payload - The payload of the event that was received.
 */
export const processReleaseEvent = async (
  payload: ReleaseEventPayload
): Promise<void> => {
  const releaseEventARN = ""; //TODO: get this value from the environment variable or parameter store

  //TODO:: Any further processing to be done if required
  publishToSNS(releaseEventARN, JSON.stringify(payload));
};

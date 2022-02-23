import { processReleaseEvent } from "./processReleaseEvent";
/**
 * It processes a Github event and routes the call to different methods based on the event type
 * @param {string} eventType - The type of event that triggered the webhook.
 * @param {any} payload - The payload of the event.
 */
export const processGitHubEvent = async (
  eventType: string,
  payload: any
): Promise<void> => {
  switch (eventType) {
    case "release":
      processReleaseEvent(payload);
      break;
    default:
      throw Error("Unsupported Github event");
  }
};

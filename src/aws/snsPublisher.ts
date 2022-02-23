import { SNS } from "aws-sdk";
import { promises } from "dns";

/**
 * `publishToSNS` is a function that takes a SNS topicARN and a message that needs to published to the topic, returns the message ID.
 * @param {string} snsARN - The ARN of the SNS topic to publish to.
 * @param {string} message - The message to send to the topic.
 */
export const publishToSNS = async (
  snsARN: string,
  message: string
): Promise<string> => {
  const sns = new SNS();

  return sns
    .publish({
      Message: JSON.stringify(message),
      TopicArn: snsARN,
    })
    .promise()
    .then((result) => {
      const msgId = result.MessageId!;
      return msgId;
    })
    .catch((err) => {
      throw err;
    });
};

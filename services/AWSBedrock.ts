import {
    BedrockRuntimeClient,
    InvokeModelCommand
  } from "@aws-sdk/client-bedrock-runtime";
import { defaultProvider } from "@aws-sdk/credential-provider-node";
  
//FIXME switch to IAM role auth
const REGION = "us-east-2";
const client = new BedrockRuntimeClient({ 
  region: REGION,
  credentials: defaultProvider() // automatically chekcs env
});

export class AWSBedrock {
  static async summarizeFeedback(feedbackText: string): Promise<string> {
    try {
      const request = {
          "prompt": `\n\nHuman: summarize this text into an easily digestible line: ${feedbackText}
                          Assistant: `,
          "max_tokens": 1000
      }
      const input = {
          body: JSON.stringify(request),
          contentType: "application/json",
          accept: "application/json",
          modelId: "meta.llama3-8b-instruct-v1:0"
      }

      const command = new InvokeModelCommand(input);
      const response = await client.send(command);

      const completion = JSON.parse(
          Buffer.from(response.body).toString('utf-8')
      );

      return completion;
    } catch (error) {
      console.error("Error summarizing feedback:", error);
      throw error;
    }
  }

}
import {
    BedrockRuntimeClient,
    InvokeModelCommand
  } from "@aws-sdk/client-bedrock-runtime";
import { defaultProvider } from "@aws-sdk/credential-provider-node";
  
// class to hold all AWS bedrock functionality
//FIXME switch to IAM role auth
const REGION = "us-east-1";
const client = new BedrockRuntimeClient({ 
  region: REGION,
  credentials: defaultProvider() // automatically chekcs env
});

export class AWSBedrock {
  static async summarizeFeedback(feedbackText: string): Promise<string> {
    try {
      // Embed the message in Llama 3's prompt format.
      const prompt = `
      <|begin_of_text|><|start_header_id|>user<|end_header_id|>
      Summarize the following into an easily digestible sentence or two: ${feedbackText}
      <|eot_id|>
      <|start_header_id|>assistant<|end_header_id|>
      `;

      const request = {
          prompt,
          max_gen_len: 256,
          temperature: 0.3
      }
      const input = {
          body: JSON.stringify(request),
          contentType: "application/json",
          accept: "application/json",
          modelId: "meta.llama3-1-8b-instruct-v1:0",
          inferenceProfileArn: "arn:aws:bedrock:us-east-1:339186615684:inference-profile/us.meta.llama3-1-8b-instruct-v1:0"
      }

      const command = new InvokeModelCommand(input);
      const response = await client.send(command);

      const completion = JSON.parse(
          Buffer.from(response.body).toString('utf-8')
      );

      console.log(completion)

      return completion;
    } catch (error) {
      console.error("Error summarizing feedback:", error);
      throw error;
    }
  }

}
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { AWSBedrock } from '@/services/AWSBedrock';

const FIREWORKS_API_KEY = process.env.NEXT_PUBLIC_FIREWORKS_API_KEY;

// summarize ta feedback using bedrock and send it back to db
export async function POST(req: Request) {
    try {
      await dbConnect(); // is there a way to not reconnect to db every time?
      const { feedbackText } = await req.json();
  
      // Call the AWS Bedrock service to summarize the feedback
      // const summary = await AWSBedrock.summarizeFeedback(feedbackText);

      const response = await fetch("https://api.fireworks.ai/inference/v1/chat/completions", {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": `Bearer ${FIREWORKS_API_KEY}`
        },
        body: JSON.stringify({
          model: "accounts/fireworks/models/llama-v3p2-3b-instruct",
          max_tokens: 4096,
          top_p: 1,
          top_k: 100,
          presence_penalty: 0,
          frequency_penalty: 0,
          temperature: 0.6,
          messages: [
            { role: "user", content: "Concisely summarize these TA observations into a single line focused on student comprehension and engagement, without any commentary:" },
            { role: "assistant", content: "I will provide a single-line summary focused on student comprehension and engagement." },
            { role: "user", content: feedbackText }
          ]
        })
      });
      const responseBody = await response.json();
      const summary = responseBody.choices[0].message.content; 
      return NextResponse.json({ summary }, { status: 201 });
    } catch (error) {
      console.error('Error summarizing feedback:', error);
      return NextResponse.json(
        { error: 'Failed to summarize feedback' },
        { status: 500 }
      );
    }
  }

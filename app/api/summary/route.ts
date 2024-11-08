import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { AWSBedrock } from '@/services/AWSBedrock';

// summarize ta feedback using bedrock and send it back to db
export async function POST(req: Request) {
    try {
      await dbConnect();
      const { feedbackText } = await req.json();
  
      // Call the AWS Bedrock service to summarize the feedback
      const summary = await AWSBedrock.summarizeFeedback(feedbackText);
  
      return NextResponse.json({ summary }, { status: 201 });
    } catch (error) {
      console.error('Error summarizing feedback:', error);
      return NextResponse.json(
        { error: 'Failed to summarize feedback' },
        { status: 500 }
      );
    }
  }

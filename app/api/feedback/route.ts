import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Feedback from '@/lib/models/feedback';

export async function POST(req: Request) {
  try {
    await dbConnect();
    const data = await req.json();
    
    const feedback = await Feedback.create(data);
    return NextResponse.json(feedback, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create feedback' },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const professorId = searchParams.get('professorId');

    const query = professorId ? { professorId } : {};
    const feedbacks = await Feedback.find(query).sort({ date: -1 });
    
    return NextResponse.json(feedbacks);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch feedback' },
      { status: 500 }
    );
  }
}
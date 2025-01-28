import { decrypt } from '@/server/data/auth';
import { getUserByEmail, verifyEmail } from '@/server/data/user';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get('token');

  if (!token) {
    return NextResponse.json({ message: 'Token is required' }, { status: 400 });
  }

  try {
    const payload = await decrypt(token);
    if (!payload) {
      return NextResponse.json({ message: 'Invalid token' }, { status: 400 });
    }
    const { userId, email } = payload as unknown as {
      userId: string;
      email: string;
    };

    if (!email || !userId) {
      return NextResponse.json({ message: 'Invalid token' }, { status: 400 });
    }

    const user = await getUserByEmail(email);
    if (user?.id !== userId) {
      return NextResponse.json({ message: 'Invalid token' }, { status: 400 });
    }

    const verified = verifyEmail(userId);

    if (!verified) {
      return NextResponse.json({ message: 'User not found.' }, { status: 404 });
    }

    return NextResponse.json(
      { message: 'Email verified successfully!' },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: 'Invalid or expired token.' },
      { status: 400 }
    );
  }
}

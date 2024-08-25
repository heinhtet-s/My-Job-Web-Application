import { NextResponse } from 'next/server';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get('email');

  if (!email) {
    return new Response(JSON.stringify({ error: 'Email parameter is required' }), { status: 400 });
  }

  try {
    const response = await fetch(`https://myjobs.dev/seeker/v1/Seekers?Email=${encodeURIComponent(email)}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      return new Response(JSON.stringify({ error: `Error: ${response.status}` }), { status: response.status });
    }

    const data = await response.json();

    // Check if user data exists
    if (data && data.length > 0) {
      return NextResponse.json(data[0]); // Assuming the email is unique and returns a single user
    } else {
      return new Response(JSON.stringify({ error: 'User not found' }), { status: 404 });
    }
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  }
}

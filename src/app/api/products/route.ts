import { NextResponse } from 'next/server';

export async function GET() {
  const friends = [
    { id: 1, name: 'PS5' },
    { id: 2, name: 'XBox' },
    { id: 3, name: 'TV 60 cali' },
  ];

  await new Promise((resolve) => setTimeout(resolve, 1000));

  return NextResponse.json(friends);
}

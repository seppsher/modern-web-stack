import { NextResponse } from 'next/server';

export async function GET() {
  const friends = [
    { id: 1, name: 'Jan Kowalski', email: 'jan@example.com' },
    { id: 2, name: 'Anna Nowak', email: 'anna@example.com' },
    { id: 3, name: 'Piotr Wiśniewski', email: 'piotr@example.com' },
  ];

  await new Promise((resolve) => setTimeout(resolve, 1000));

  return NextResponse.json(friends);
}

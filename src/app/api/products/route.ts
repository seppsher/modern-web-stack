import { NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';
import { randomUUID } from 'crypto';

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, brand } = body;

    const sql = neon(`${process.env.DATABASE_URL}`);
    const result = await sql`
      INSERT INTO products (name, brand, id) 
      VALUES (${name}, ${brand}, ${randomUUID()})
    `;

    return NextResponse.json(
      {
        success: true,
        message: 'Product created successfully',
        data: result[0],
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Database error:', error);

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const sql = neon(`${process.env.DATABASE_URL}`);
    const products = await sql`
      SELECT * FROM products 
    `;

    return NextResponse.json(products);
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

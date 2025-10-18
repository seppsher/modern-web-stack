import { NextRequest, NextResponse } from 'next/server';

import { neon } from '@neondatabase/serverless';

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const pathSegments = url.pathname.split('/');
    const id = pathSegments[pathSegments.length - 1];

    const sql = neon(`${process.env.DATABASE_URL}`);
    const product = (await sql`SELECT * FROM products WHERE id = ${id}`)[0];

    if (!product) {
      return NextResponse.json(
        { error: 'Produkt nie znaleziony' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      id: product.id,
      name: product.name,
      brand: product.brand,
    });
  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json(
      { error: 'Produkt nie znaleziony' },
      { status: 404 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const body = await request.json();

    const { name, brand } = body;

    const sql = neon(`${process.env.DATABASE_URL}`);

    const { id } = await params;

    const existingProduct = await sql`
      SELECT id FROM products WHERE id = ${id}
    `;

    if (existingProduct.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Product not found' },
        { status: 404 }
      );
    }

    const result = await sql`
      UPDATE products
      SET
        name = COALESCE(${name}, name),
        brand = COALESCE(${brand}, brand)
      WHERE id = ${id}
      RETURNING *
    `;

    console.log(result);

    return NextResponse.json({
      success: true,
      data: result[0],
      message: 'Product updated successfully',
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid data', details: error.errors },
      { status: 400 }
    );
  }
}

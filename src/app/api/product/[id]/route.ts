import { NextRequest, NextResponse } from 'next/server';

import DatabaseConstructor, { Database } from 'better-sqlite3';

function openDb(filename: string): Database {
  let db: Database = new DatabaseConstructor(filename);
  return db;
}

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const pathSegments = url.pathname.split('/');
    const id = pathSegments[pathSegments.length - 1];

    const db = openDb('./products.db');

    const stmt = db.prepare('SELECT * FROM products WHERE id = ?');
    const product = stmt.get(parseInt(id));

    await db.close();

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

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const body = await request.json();
    const db = openDb('./products.db');

    const { id } = await params;

    const fields = Object.keys(body).filter((key) => body[key] !== undefined);

    const setClause = fields.map((field) => `${field} = ?`).join(', ');
    const values = fields.map((field) => body[field]);
    values.push(id);
    const sql = `UPDATE products SET ${setClause} WHERE id = ?`;

    const stmt = db.prepare(sql);

    stmt.run(values);

    await db.close();

    return NextResponse.json({});
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid data', details: error.errors },
      { status: 400 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const body = await request.json();
    const db = openDb('./products.db');

    const { id } = await params;

    const fields = Object.keys(body).filter((key) => body[key] !== undefined);

    const setClause = fields.map((field) => `${field} = ?`).join(', ');
    const values = fields.map((field) => body[field]);
    values.push(id);
    const sql = `UPDATE products SET ${setClause} WHERE id = ?`;

    const stmt = db.prepare(sql);

    stmt.run(values);

    await db.close();

    return NextResponse.json({});
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid data', details: error.errors },
      { status: 400 }
    );
  }
}

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

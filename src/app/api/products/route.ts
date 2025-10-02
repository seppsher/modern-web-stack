import { NextResponse } from 'next/server';
import Database from 'better-sqlite3';

function initDB() {
  const db = new Database('products.db');

  db.exec(`
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      brand TEXT NOT NULL
    )
  `);

  return db;
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, brand } = body;

    const db = initDB();

    const stmt = db.prepare(`
      INSERT INTO products (name, brand) 
      VALUES (?, ?)
    `);

    const result = stmt.run(name, brand);

    db.close();

    return NextResponse.json(
      {
        success: true,
        message: 'Product created successfully',
        productId: result.lastInsertRowid,
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
    const db = initDB();
    const stmt = db.prepare('SELECT * FROM products');
    const products = stmt.all();
    db.close();

    return NextResponse.json(products);
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

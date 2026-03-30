import { NextResponse } from 'next/server';
import { payroll } from '@/lib/data';

export async function GET() {
  return NextResponse.json(payroll);
}

export async function POST(request: Request) {
  const data = await request.json();
  const newRecord = { ...data, id: Math.random().toString(36).substr(2, 9), createdAt: new Date().toISOString() };
  payroll.push(newRecord);
  return NextResponse.json(newRecord);
}

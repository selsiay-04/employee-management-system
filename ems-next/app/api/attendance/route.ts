import { NextResponse } from 'next/server';
import { attendance } from '@/lib/data';

export async function GET() {
  return NextResponse.json(attendance);
}

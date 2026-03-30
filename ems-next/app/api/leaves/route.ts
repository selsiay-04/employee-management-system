import { NextResponse } from 'next/server';
import { leaves, LeaveRequest } from '@/lib/data';

export async function GET() {
  return NextResponse.json(leaves);
}

export async function POST(request: Request) {
  const body = await request.json();
  const newLeave: LeaveRequest = {
    id: Math.random().toString(36).substring(7),
    ...body,
    status: 'Pending',
    createdAt: new Date().toISOString(),
  };
  leaves.unshift(newLeave); // Add to the beginning
  return NextResponse.json(newLeave);
}

export async function PUT(request: Request) {
  const { id, status } = await request.json();
  const index = leaves.findIndex(l => l.id === id);
  if (index !== -1) {
    leaves[index].status = status;
    return NextResponse.json(leaves[index]);
  }
  return NextResponse.json({ error: 'Not found' }, { status: 404 });
}

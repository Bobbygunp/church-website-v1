// src/app/api/admin/invitations/create/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import crypto from 'crypto';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // Generate a unique token
    const token = crypto.randomBytes(32).toString('hex');

    // Set expiration date (e.g., 24 hours from now)
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 24);

    // Create invitation in the database
    const invitation = await prisma.invitation.create({
      data: {
        email,
        token,
        expiresAt,
      },
    });

    return NextResponse.json({ invitation });
  } catch (error) {
    console.error('Error creating invitation:', error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}

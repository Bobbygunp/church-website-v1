// src/app/api/admin/register/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { token, name, password } = await request.json();

    if (!token || !name || !password) {
      return NextResponse.json({ error: 'Token, name, and password are required' }, { status: 400 });
    }

    // 1. Verify Invitation Token
    const invitation = await prisma.invitation.findUnique({
      where: { token },
    });

    if (!invitation || invitation.used || invitation.expiresAt < new Date()) {
      return NextResponse.json({ error: 'Invalid, used, or expired invitation token' }, { status: 400 });
    }

    // 2. Hash Password
    const hashedPassword = await bcrypt.hash(password, 10); // 10 rounds of salting

    // 3. Create User Account
    const newUser = await prisma.user.create({
      data: {
        email: invitation.email,
        name,
        password: hashedPassword,
        role: "ADMIN", // Default role for invited admins
      },
    });

    // 4. Mark Invitation as Used
    await prisma.invitation.update({
      where: { id: invitation.id },
      data: { used: true },
    });

    return NextResponse.json({ message: 'Admin account created successfully!', user: newUser }, { status: 201 });
  } catch (error) {
    console.error('Error during admin registration:', error);
    return NextResponse.json({ error: 'Something went wrong during registration' }, { status: 500 });
  }
}

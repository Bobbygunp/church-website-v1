// src/app/api/admin/users/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
// You might want to add authentication here to ensure only admins can access this endpoint

const prisma = new PrismaClient();

export async function GET(request: Request) {
  try {
    // In a real application, you'd verify the user's session and role here
    // For now, we'll assume the request is authorized.
    // const session = await getServerSession(authOptions);
    // if (!session || session.user.role !== 'ADMIN') {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    // }

    const admins = await prisma.user.findMany({
      where: {
        role: 'ADMIN',
      },
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
      },
    });

    return NextResponse.json({ admins });
  } catch (error) {
    console.error('Error fetching admins:', error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}

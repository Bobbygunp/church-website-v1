// src/app/api/admin/users/delete/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
// You might want to add authentication here to ensure only authorized admins can use this endpoint

const prisma = new PrismaClient();

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();

    if (!id) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    // In a real application, you'd verify the requesting user's session and role here
    // Also, ensure an admin cannot delete themselves or a 'super admin'.
    // const session = await getServerSession(authOptions);
    // if (!session || session.user.role !== 'ADMIN') {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    // }
    // if (session.user.id === id) {
    //   return NextResponse.json({ error: 'Cannot delete your own account' }, { status: 400 });
    // }

    await prisma.user.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Admin user deleted successfully!' });
  } catch (error) {
    console.error('Error deleting admin user:', error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}

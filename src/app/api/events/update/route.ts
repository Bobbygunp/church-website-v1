import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const data = await req.json();
    console.log("Received data for event update:", data); // Log incoming data

    // First, try to find an existing featured event to get its ID
    const existing = await prisma.event.findFirst({
      where: { isFeatured: true }
    });

    // Prepare data for update/create, excluding `id` if present
    const dataToSave: any = { ...data };
    delete dataToSave.id; // Ensure ID is not passed in data for update/create operations

    if (existing) {
      // Update existing
      const updated = await prisma.event.update({
        where: { id: existing.id },
        data: {
          ...dataToSave,
          startDate: new Date(dataToSave.startDate), // Ensure date string is converted
        }
      });
      return NextResponse.json(updated);
    } else {
      // Create new
      const created = await prisma.event.create({
        data: {
          ...dataToSave,
          startDate: new Date(dataToSave.startDate),
          isFeatured: true
        }
      });
      return NextResponse.json(created);
    }

  } catch (error: any) {
    console.error("Failed to update event:", error);
    console.error("Data that caused the error:", data); // Log the data that caused the error
    return NextResponse.json({ error: `Failed to update: ${error.message || 'Unknown error'}` }, { status: 500 });
  }
}
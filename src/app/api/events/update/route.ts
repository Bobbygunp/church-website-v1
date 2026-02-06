import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const data = await req.json();

    // We use "upsert" to either update the existing featured event OR create a new one if none exists.
    // Ideally, you'd manage IDs, but for a "Monthly Event", we can just keep updating the one marked "isFeatured".
    
    // First, try to find an existing featured event to get its ID
    const existing = await prisma.event.findFirst({
      where: { isFeatured: true }
    });

    if (existing) {
      // Update existing
      const updated = await prisma.event.update({
        where: { id: existing.id },
        data: {
          ...data,
          startDate: new Date(data.startDate), // Ensure date string is converted
        }
      });
      return NextResponse.json(updated);
    } else {
      // Create new
      const created = await prisma.event.create({
        data: {
          ...data,
          startDate: new Date(data.startDate),
          isFeatured: true
        }
      });
      return NextResponse.json(created);
    }

  } catch (error) {
    console.error("Failed to update event:", error);
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}
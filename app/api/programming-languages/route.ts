import { NextResponse } from "next/server";
import { PrismaClient } from "@codezest-academy/codezest-db";

const prisma = new PrismaClient();

/**
 * GET /api/programming-languages
 * Returns all active programming languages for dropdown selection
 */
export async function GET() {
  try {
    const languages = await prisma.programmingLanguage.findMany({
      where: {
        isActive: true,
        deletedAt: null,
      },
      select: {
        id: true,
        name: true,
        slug: true,
        icon: true,
        difficulty: true,
      },
      orderBy: {
        name: "asc",
      },
    });

    return NextResponse.json(languages);
  } catch (error) {
    console.error("Error fetching programming languages:", error);
    return NextResponse.json(
      { error: "Failed to fetch programming languages" },
      { status: 500 }
    );
  }
}

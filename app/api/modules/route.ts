import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@codezest-academy/codezest-db";
import { moduleFormSchema } from "@/shared/lib/validations/module-schema";

const prisma = new PrismaClient();

/**
 * GET /api/modules
 * Returns all modules with optional filtering
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const languageId = searchParams.get("languageId");
    const search = searchParams.get("search");

    const modules = await prisma.module.findMany({
      where: {
        deletedAt: null,
        ...(languageId && { languageId }),
        ...(search && {
          OR: [
            { title: { contains: search, mode: "insensitive" } },
            { description: { contains: search, mode: "insensitive" } },
          ],
        }),
      },
      include: {
        language: {
          select: {
            id: true,
            name: true,
            slug: true,
            icon: true,
          },
        },
        _count: {
          select: {
            materials: true,
            assignments: true,
            mcqQuizzes: true,
          },
        },
      },
      orderBy: [{ order: "asc" }, { createdAt: "desc" }],
    });

    return NextResponse.json(modules);
  } catch (error) {
    console.error("Error fetching modules:", error);
    return NextResponse.json(
      { error: "Failed to fetch modules" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/modules
 * Creates a new module
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate request body
    const validationResult = moduleFormSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: "Validation failed",
          details: validationResult.error.format(),
        },
        { status: 400 }
      );
    }

    const data = validationResult.data;

    // Check if slug already exists for this language
    const existingModule = await prisma.module.findFirst({
      where: {
        languageId: data.languageId,
        slug: data.slug,
        deletedAt: null,
      },
    });

    if (existingModule) {
      return NextResponse.json(
        {
          error: "A module with this slug already exists for this language",
        },
        { status: 409 }
      );
    }

    // Create the module
    const module = await prisma.module.create({
      data: {
        languageId: data.languageId,
        title: data.title,
        slug: data.slug,
        description: data.description || null,
        syllabus: data.syllabus || null,
        order: data.order,
      },
      include: {
        language: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
      },
    });

    return NextResponse.json(module, { status: 201 });
  } catch (error) {
    console.error("Error creating module:", error);
    return NextResponse.json(
      { error: "Failed to create module" },
      { status: 500 }
    );
  }
}

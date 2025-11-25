import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@codezest-academy/codezest-db";
import { moduleFormSchema } from "@/shared/lib/validations/module-schema";

const prisma = new PrismaClient();

/**
 * GET /api/modules/[id]
 * Returns a single module by ID
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const moduleData = await prisma.module.findUnique({
      where: {
        id,
        deletedAt: null,
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
            progress: true,
          },
        },
      },
    });

    if (!moduleData) {
      return NextResponse.json({ error: "Module not found" }, { status: 404 });
    }

    return NextResponse.json(moduleData);
  } catch (error) {
    console.error("Error fetching module:", error);
    return NextResponse.json(
      { error: "Failed to fetch module" },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/modules/[id]
 * Updates an existing module
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
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

    // Check if module exists
    const existingModule = await prisma.module.findUnique({
      where: { id, deletedAt: null },
    });

    if (!existingModule) {
      return NextResponse.json({ error: "Module not found" }, { status: 404 });
    }

    // Check if slug already exists for this language (excluding current module)
    const duplicateSlug = await prisma.module.findFirst({
      where: {
        languageId: data.languageId,
        slug: data.slug,
        deletedAt: null,
        NOT: { id },
      },
    });

    if (duplicateSlug) {
      return NextResponse.json(
        {
          error: "A module with this slug already exists for this language",
        },
        { status: 409 }
      );
    }

    // Update the module
    const updatedModule = await prisma.module.update({
      where: { id },
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

    return NextResponse.json(updatedModule);
  } catch (error) {
    console.error("Error updating module:", error);
    return NextResponse.json(
      { error: "Failed to update module" },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/modules/[id]
 * Soft deletes a module
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Check if module exists
    const existingModule = await prisma.module.findUnique({
      where: { id, deletedAt: null },
    });

    if (!existingModule) {
      return NextResponse.json({ error: "Module not found" }, { status: 404 });
    }

    // Soft delete the module
    await prisma.module.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });

    return NextResponse.json({ message: "Module deleted successfully" });
  } catch (error) {
    console.error("Error deleting module:", error);
    return NextResponse.json(
      { error: "Failed to delete module" },
      { status: 500 }
    );
  }
}

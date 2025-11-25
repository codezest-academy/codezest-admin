import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@codezest-academy/codezest-db";
import { materialFormSchema } from "@/shared/lib/validations/material-schema";

const prisma = new PrismaClient();

/**
 * GET /api/materials/[id]
 * Returns a single material by ID
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const material = await prisma.material.findUnique({
      where: {
        id,
        deletedAt: null,
      },
      include: {
        module: {
          select: {
            id: true,
            title: true,
            slug: true,
            language: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
        _count: {
          select: {
            progress: true,
          },
        },
      },
    });

    if (!material) {
      return NextResponse.json(
        { error: "Material not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(material);
  } catch (error) {
    console.error("Error fetching material:", error);
    return NextResponse.json(
      { error: "Failed to fetch material" },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/materials/[id]
 * Updates an existing material
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    // Validate request body
    const validationResult = materialFormSchema.safeParse(body);

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

    // Check if material exists
    const existingMaterial = await prisma.material.findUnique({
      where: { id, deletedAt: null },
    });

    if (!existingMaterial) {
      return NextResponse.json(
        { error: "Material not found" },
        { status: 404 }
      );
    }

    // Update the material
    const material = await prisma.material.update({
      where: { id },
      data: {
        moduleId: data.moduleId,
        title: data.title,
        type: data.type,
        content: data.content,
        duration: data.duration || null,
        order: data.order,
      },
      include: {
        module: {
          select: {
            id: true,
            title: true,
            slug: true,
          },
        },
      },
    });

    return NextResponse.json(material);
  } catch (error) {
    console.error("Error updating material:", error);
    return NextResponse.json(
      { error: "Failed to update material" },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/materials/[id]
 * Soft deletes a material
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Check if material exists
    const existingMaterial = await prisma.material.findUnique({
      where: { id, deletedAt: null },
    });

    if (!existingMaterial) {
      return NextResponse.json(
        { error: "Material not found" },
        { status: 404 }
      );
    }

    // Soft delete the material
    await prisma.material.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });

    return NextResponse.json({ message: "Material deleted successfully" });
  } catch (error) {
    console.error("Error deleting material:", error);
    return NextResponse.json(
      { error: "Failed to delete material" },
      { status: 500 }
    );
  }
}

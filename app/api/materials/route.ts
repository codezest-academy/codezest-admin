import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@codezest-academy/codezest-db";
import { materialFormSchema } from "@/shared/lib/validations/material-schema";

const prisma = new PrismaClient();

/**
 * GET /api/materials
 * Returns all materials with optional filtering
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const moduleId = searchParams.get("moduleId");
    const type = searchParams.get("type");
    const search = searchParams.get("search");

    const materials = await prisma.material.findMany({
      where: {
        deletedAt: null,
        ...(moduleId && { moduleId }),
        ...(type && { type: type as any }),
        ...(search && {
          title: { contains: search, mode: "insensitive" },
        }),
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
                slug: true,
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
      orderBy: [{ order: "asc" }, { createdAt: "desc" }],
    });

    return NextResponse.json(materials);
  } catch (error) {
    console.error("Error fetching materials:", error);
    return NextResponse.json(
      { error: "Failed to fetch materials" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/materials
 * Creates a new material
 */
export async function POST(request: NextRequest) {
  try {
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

    // Create the material
    const material = await prisma.material.create({
      data: {
        moduleId: data.moduleId,
        title: data.title,
        type: data.type as any,
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

    return NextResponse.json(material, { status: 201 });
  } catch (error) {
    console.error("Error creating material:", error);
    return NextResponse.json(
      { error: "Failed to create material" },
      { status: 500 }
    );
  }
}

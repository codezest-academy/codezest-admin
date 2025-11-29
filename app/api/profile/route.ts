import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@codezest-academy/codezest-db";
import { profileUpdateSchema } from "@/shared/lib/validations/profile-schema";

const prisma = new PrismaClient();

// Mock user ID - In production, get this from session/JWT
const MOCK_USER_ID = "mock-user-123";

/**
 * GET /api/profile
 * Returns the current user's profile information
 */
export async function GET() {
  try {
    // In production: Get user ID from session/JWT
    const userId = MOCK_USER_ID;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        emailVerified: true,
        createdAt: true,
        profile: {
          select: {
            bio: true,
            avatar: true,
            location: true,
            website: true,
            phone: true,
          },
        },
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error("Error fetching profile:", error);
    return NextResponse.json(
      { error: "Failed to fetch profile" },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/profile
 * Updates the current user's profile information
 */
export async function PUT(request: NextRequest) {
  try {
    // In production: Get user ID from session/JWT
    const userId = MOCK_USER_ID;

    const body = await request.json();

    // Validate request body
    const validationResult = profileUpdateSchema.safeParse(body);

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

    // Update user basic info
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
      },
    });

    // Upsert user profile
    const updatedProfile = await prisma.userProfile.upsert({
      where: { userId },
      create: {
        userId,
        bio: data.bio || null,
        avatar: data.avatar || null,
        location: data.location || null,
        website: data.website || null,
        phone: data.phone || null,
      },
      update: {
        bio: data.bio || null,
        avatar: data.avatar || null,
        location: data.location || null,
        website: data.website || null,
        phone: data.phone || null,
      },
    });

    return NextResponse.json({
      user: updatedUser,
      profile: updatedProfile,
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    return NextResponse.json(
      { error: "Failed to update profile" },
      { status: 500 }
    );
  }
}

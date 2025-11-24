import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@codezest-academy/codezest-db";
import { quizFormSchema } from "@/shared/lib/validations/quiz-schema";

const prisma = new PrismaClient();

/**
 * GET /api/quizzes/[id]
 * Returns a single quiz by ID with questions and options
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const quiz = await prisma.mCQQuiz.findUnique({
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
        questions: {
          include: {
            options: {
              orderBy: { order: "asc" },
            },
          },
          orderBy: { order: "asc" },
        },
        _count: {
          select: {
            attempts: true,
          },
        },
      },
    });

    if (!quiz) {
      return NextResponse.json({ error: "Quiz not found" }, { status: 404 });
    }

    return NextResponse.json(quiz);
  } catch (error) {
    console.error("Error fetching quiz:", error);
    return NextResponse.json(
      { error: "Failed to fetch quiz" },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/quizzes/[id]
 * Updates an existing quiz (deletes old questions/options, creates new ones)
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    // Validate request body
    const validationResult = quizFormSchema.safeParse(body);

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

    // Check if quiz exists
    const existingQuiz = await prisma.mCQQuiz.findUnique({
      where: { id, deletedAt: null },
    });

    if (!existingQuiz) {
      return NextResponse.json({ error: "Quiz not found" }, { status: 404 });
    }

    // Update quiz in a transaction
    const quiz = await prisma.$transaction(async (tx) => {
      // Update quiz details
      const updatedQuiz = await tx.mCQQuiz.update({
        where: { id },
        data: {
          moduleId: data.moduleId,
          title: data.title,
          description: data.description || null,
          passingScore: data.passingScore,
          timeLimit: data.timeLimit || null,
        },
      });

      // Delete all existing questions (cascade will delete options)
      await tx.mCQQuestion.deleteMany({
        where: { quizId: id },
      });

      // Create new questions with options
      for (const question of data.questions) {
        await tx.mCQQuestion.create({
          data: {
            quizId: id,
            question: question.question,
            explanation: question.explanation || null,
            order: question.order,
            points: question.points,
            options: {
              create: question.options.map((option) => ({
                optionText: option.optionText,
                isCorrect: option.isCorrect,
                order: option.order,
              })),
            },
          },
        });
      }

      return updatedQuiz;
    });

    // Fetch the complete updated quiz
    const completeQuiz = await prisma.mCQQuiz.findUnique({
      where: { id },
      include: {
        module: {
          select: {
            id: true,
            title: true,
            slug: true,
          },
        },
        questions: {
          include: {
            options: {
              orderBy: { order: "asc" },
            },
          },
          orderBy: { order: "asc" },
        },
      },
    });

    return NextResponse.json(completeQuiz);
  } catch (error) {
    console.error("Error updating quiz:", error);
    return NextResponse.json(
      { error: "Failed to update quiz" },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/quizzes/[id]
 * Soft deletes a quiz
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Check if quiz exists
    const existingQuiz = await prisma.mCQQuiz.findUnique({
      where: { id, deletedAt: null },
    });

    if (!existingQuiz) {
      return NextResponse.json({ error: "Quiz not found" }, { status: 404 });
    }

    // Soft delete the quiz
    await prisma.mCQQuiz.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });

    return NextResponse.json({ message: "Quiz deleted successfully" });
  } catch (error) {
    console.error("Error deleting quiz:", error);
    return NextResponse.json(
      { error: "Failed to delete quiz" },
      { status: 500 }
    );
  }
}

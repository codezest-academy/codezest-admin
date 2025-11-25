import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@codezest-academy/codezest-db";
import { quizFormSchema } from "@/shared/lib/validations/quiz-schema";

const prisma = new PrismaClient();

/**
 * GET /api/quizzes
 * Returns all quizzes with optional filtering
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const moduleId = searchParams.get("moduleId");
    const search = searchParams.get("search");

    const quizzes = await prisma.mCQQuiz.findMany({
      where: {
        deletedAt: null,
        ...(moduleId && { moduleId }),
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
            questions: true,
            attempts: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(quizzes);
  } catch (error) {
    console.error("Error fetching quizzes:", error);
    return NextResponse.json(
      { error: "Failed to fetch quizzes" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/quizzes
 * Creates a new quiz with questions and options
 */
export async function POST(request: NextRequest) {
  try {
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

    // Create quiz with questions and options in a transaction
    const quiz = await prisma.$transaction(async (tx: PrismaClient) => {
      // Create the quiz
      const newQuiz = await tx.mCQQuiz.create({
        data: {
          moduleId: data.moduleId,
          title: data.title,
          description: data.description || null,
          passingScore: data.passingScore,
          timeLimit: data.timeLimit || null,
        },
      });

      // Create questions with options
      for (const question of data.questions) {
        await tx.mCQQuestion.create({
          data: {
            quizId: newQuiz.id,
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

      return newQuiz;
    });

    // Fetch the complete quiz with questions and options
    const completeQuiz = await prisma.mCQQuiz.findUnique({
      where: { id: quiz.id },
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

    return NextResponse.json(completeQuiz, { status: 201 });
  } catch (error) {
    console.error("Error creating quiz:", error);
    return NextResponse.json(
      { error: "Failed to create quiz" },
      { status: 500 }
    );
  }
}

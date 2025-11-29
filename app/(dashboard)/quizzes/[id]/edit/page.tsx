"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/primitives/button";
import { QuizForm } from "@/widgets/quizzes/quiz-form";
import { Skeleton } from "@/components/ui/primitives/skeleton";
import type { QuizFormData, QuizQuestionData, QuizOptionData } from "@/shared/lib/validations/quiz-schema";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function EditQuizPage({ params }: PageProps) {
  const router = useRouter();
  const [quizId, setQuizId] = useState<string>("");
  const [initialData, setInitialData] = useState<QuizFormData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    async function loadParams() {
      const resolvedParams = await params;
      setQuizId(resolvedParams.id);
    }
    loadParams();
  }, [params]);

  useEffect(() => {
    if (!quizId) return;

    async function fetchQuiz() {
      try {
        const response = await fetch(`/api/quizzes/${quizId}`);

        if (response.ok) {
          const quiz = await response.json();
          setInitialData({
            moduleId: quiz.moduleId,
            title: quiz.title,
            description: quiz.description || "",
            passingScore: quiz.passingScore,
            timeLimit: quiz.timeLimit,
            questions: quiz.questions.map((q: QuizQuestionData) => ({
              id: q.id,
              question: q.question,
              explanation: q.explanation || "",
              order: q.order,
              points: q.points,
              options: q.options.map((o: QuizOptionData) => ({
                id: o.id,
                optionText: o.optionText,
                isCorrect: o.isCorrect,
                order: o.order,
              })),
            })),
          });
        } else {
          toast.error("Quiz not found");
          router.push("/quizzes");
        }
      } catch (error) {
        console.error("Failed to fetch quiz:", error);
        toast.error("Failed to load quiz");
        router.push("/quizzes");
      } finally {
        setLoading(false);
      }
    }

    fetchQuiz();
  }, [quizId, router]);

  async function handleSubmit(data: QuizFormData) {
    setIsSubmitting(true);

    try {
      const response = await fetch(`/api/quizzes/${quizId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast.success("Quiz updated successfully!");
        router.push("/quizzes");
        router.refresh();
      } else {
        const error = await response.json();
        toast.error(error.error || "Failed to update quiz");
      }
    } catch (error) {
      console.error("Submit failed:", error);
      toast.error("Failed to update quiz");
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleCancel() {
    router.push("/quizzes");
  }

  if (loading) {
    return (
      <div className="space-y-6 max-w-4xl">
        <div className="flex items-center gap-4">
          <Skeleton className="h-10 w-10 rounded-md" />
          <div className="space-y-2">
            <Skeleton className="h-8 w-64" />
            <Skeleton className="h-4 w-96" />
          </div>
        </div>
        <div className="space-y-4">
          <Skeleton className="h-[600px] w-full rounded-lg" />
        </div>
      </div>
    );
  }

  if (!initialData) {
    return null;
  }

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/quizzes">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold font-display text-neutral-950">
            Edit Quiz
          </h1>
          <p className="text-neutral-500 mt-1">
            Update quiz details and questions
          </p>
        </div>
      </div>

      {/* Form */}
      <QuizForm
        initialData={initialData}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}

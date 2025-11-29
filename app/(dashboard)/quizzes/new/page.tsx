"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/primitives/button";
import { QuizForm } from "@/widgets/quizzes/quiz-form";
import type { QuizFormData } from "@/shared/lib/validations/quiz-schema";

export default function NewQuizPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(data: QuizFormData) {
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/quizzes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast.success("Quiz created successfully!");
        router.push("/quizzes");
        router.refresh();
      } else {
        const error = await response.json();
        toast.error(error.error || "Failed to create quiz");
      }
    } catch (error) {
      console.error("Submit failed:", error);
      toast.error("Failed to create quiz");
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleCancel() {
    router.push("/quizzes");
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
            Create New Quiz
          </h1>
          <p className="text-neutral-500 mt-1">
            Add a new MCQ quiz to a module
          </p>
        </div>
      </div>

      {/* Form */}
      <QuizForm
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}

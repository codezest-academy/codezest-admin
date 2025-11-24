"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

import { Button } from "@/ui/button";
import { ModuleForm } from "@/widgets/modules/module-form";
import type { ModuleFormData } from "@/shared/lib/validations/module-schema";

export default function NewModulePage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(data: ModuleFormData) {
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/modules", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast.success("Module created successfully!");
        router.push("/modules");
        router.refresh();
      } else {
        const error = await response.json();
        toast.error(error.error || "Failed to create module");
      }
    } catch (error) {
      console.error("Submit failed:", error);
      toast.error("Failed to create module");
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleCancel() {
    router.push("/modules");
  }

  return (
    <div className="space-y-6 max-w-3xl">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/modules">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold font-display text-neutral-950">
            Create New Module
          </h1>
          <p className="text-neutral-500 mt-1">
            Add a new learning module to a programming language
          </p>
        </div>
      </div>

      {/* Form */}
      <ModuleForm
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}

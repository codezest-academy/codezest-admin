"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

import { Button } from "@/ui/button";
import { MaterialForm } from "@/widgets/materials/material-form";
import type { MaterialFormData } from "@/shared/lib/validations/material-schema";

export default function NewMaterialPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(data: MaterialFormData) {
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/materials", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast.success("Material created successfully!");
        router.push("/materials");
        router.refresh();
      } else {
        const error = await response.json();
        toast.error(error.error || "Failed to create material");
      }
    } catch (error) {
      console.error("Submit failed:", error);
      toast.error("Failed to create material");
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleCancel() {
    router.push("/materials");
  }

  return (
    <div className="space-y-6 max-w-3xl">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/materials">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold font-display text-neutral-950">
            Create New Material
          </h1>
          <p className="text-neutral-500 mt-1">
            Add a new learning material to a module
          </p>
        </div>
      </div>

      {/* Form */}
      <MaterialForm
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}

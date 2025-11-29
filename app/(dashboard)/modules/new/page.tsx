"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";

import { Button } from "@/components/ui/primitives/button";
import { ModuleForm } from "@/widgets/modules/module-form";
import type { ModuleFormData } from "@/shared/lib/validations/module-schema";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/primitives/breadcrumb";

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
    <div className="space-y-8 max-w-3xl mx-auto">
      {/* Page Header */}
      <div className="space-y-4">
        {/* Breadcrumb Navigation */}
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/dashboard">Dashboard</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/modules">Modules</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>New</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Title & Description */}
        <div>
          <h1 className="text-3xl font-bold font-display text-neutral-950">
            Create New Module
          </h1>
          <p className="text-neutral-500 mt-2">
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

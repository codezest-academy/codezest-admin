"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";

import { Button } from "@/ui/button";
import { ModuleForm } from "@/widgets/modules/module-form";
import { Skeleton } from "@/ui/skeleton";
import type { ModuleFormData } from "@/shared/lib/validations/module-schema";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function EditModulePage({ params }: PageProps) {
  const router = useRouter();
  const [moduleId, setModuleId] = useState<string>("");
  const [initialData, setInitialData] = useState<ModuleFormData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    async function loadParams() {
      const resolvedParams = await params;
      setModuleId(resolvedParams.id);
    }
    loadParams();
  }, [params]);

  useEffect(() => {
    if (!moduleId) return;

    async function fetchModule() {
      try {
        const response = await fetch(`/api/modules/${moduleId}`);

        if (response.ok) {
          const moduleData = await response.json();
          setInitialData({
            languageId: moduleData.languageId,
            title: moduleData.title,
            slug: moduleData.slug,
            description: moduleData.description || "",
            syllabus: moduleData.syllabus || "",
            order: moduleData.order,
          });
        } else {
          toast.error("Module not found");
          router.push("/modules");
        }
      } catch (error) {
        console.error("Failed to fetch module:", error);
        toast.error("Failed to load module");
        router.push("/modules");
      } finally {
        setLoading(false);
      }
    }

    fetchModule();
  }, [moduleId, router]);

  async function handleSubmit(data: ModuleFormData) {
    setIsSubmitting(true);

    try {
      const response = await fetch(`/api/modules/${moduleId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast.success("Module updated successfully!");
        router.push("/modules");
        router.refresh();
      } else {
        const error = await response.json();
        toast.error(error.error || "Failed to update module");
      }
    } catch (error) {
      console.error("Submit failed:", error);
      toast.error("Failed to update module");
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleCancel() {
    router.push("/modules");
  }

  if (loading) {
    return (
      <div className="space-y-6 max-w-3xl">
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
            Edit Module
          </h1>
          <p className="text-neutral-500 mt-1">
            Update module information and settings
          </p>
        </div>
      </div>

      {/* Form */}
      <ModuleForm
        initialData={initialData}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}

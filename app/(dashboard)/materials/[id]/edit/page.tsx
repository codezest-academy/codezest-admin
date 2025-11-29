"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/primitives/button";
import { MaterialForm } from "@/widgets/materials/material-form";
import { Skeleton } from "@/components/ui/primitives/skeleton";
import type { MaterialFormData } from "@/shared/lib/validations/material-schema";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function EditMaterialPage({ params }: PageProps) {
  const router = useRouter();
  const [materialId, setMaterialId] = useState<string>("");
  const [initialData, setInitialData] = useState<MaterialFormData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    async function loadParams() {
      const resolvedParams = await params;
      setMaterialId(resolvedParams.id);
    }
    loadParams();
  }, [params]);

  useEffect(() => {
    if (!materialId) return;

    async function fetchMaterial() {
      try {
        const response = await fetch(`/api/materials/${materialId}`);

        if (response.ok) {
          const material = await response.json();
          setInitialData({
            moduleId: material.moduleId,
            title: material.title,
            type: material.type,
            content: material.content,
            duration: material.duration,
            order: material.order,
          });
        } else {
          toast.error("Material not found");
          router.push("/materials");
        }
      } catch (error) {
        console.error("Failed to fetch material:", error);
        toast.error("Failed to load material");
        router.push("/materials");
      } finally {
        setLoading(false);
      }
    }

    fetchMaterial();
  }, [materialId, router]);

  async function handleSubmit(data: MaterialFormData) {
    setIsSubmitting(true);

    try {
      const response = await fetch(`/api/materials/${materialId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast.success("Material updated successfully!");
        router.push("/materials");
        router.refresh();
      } else {
        const error = await response.json();
        toast.error(error.error || "Failed to update material");
      }
    } catch (error) {
      console.error("Submit failed:", error);
      toast.error("Failed to update material");
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleCancel() {
    router.push("/materials");
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
          <Link href="/materials">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold font-display text-neutral-950">
            Edit Material
          </h1>
          <p className="text-neutral-500 mt-1">
            Update material information and content
          </p>
        </div>
      </div>

      {/* Form */}
      <MaterialForm
        initialData={initialData}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}

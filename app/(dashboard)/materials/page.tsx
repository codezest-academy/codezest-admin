"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Search } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/primitives/button";
import { Input } from "@/components/ui/primitives/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/primitives/select";
import { MaterialTable } from "@/widgets/materials/material-table";
import { Skeleton } from "@/components/ui/primitives/skeleton";

interface Material {
  id: string;
  title: string;
  type: "VIDEO" | "ARTICLE" | "CODE_EXAMPLE" | "INTERACTIVE";
  content: string;
  duration: number | null;
  order: number;
  createdAt: string;
  module: {
    id: string;
    title: string;
    slug: string;
    language: {
      name: string;
    };
  };
  _count: {
    progress: number;
  };
}

interface Module {
  id: string;
  title: string;
  language: {
    name: string;
  };
}

export default function MaterialsPage() {
  const [materials, setMaterials] = useState<Material[]>([]);
  const [modules, setModules] = useState<Module[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedModule, setSelectedModule] = useState<string>("all");
  const [selectedType, setSelectedType] = useState<string>("all");

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      setLoading(true);
      const [materialsRes, modulesRes] = await Promise.all([
        fetch("/api/materials"),
        fetch("/api/modules"),
      ]);

      if (materialsRes.ok) {
        const materialsData = await materialsRes.json();
        setMaterials(materialsData);
      }

      if (modulesRes.ok) {
        const modulesData = await modulesRes.json();
        setModules(modulesData);
      }
    } catch (error) {
      console.error("Failed to fetch data:", error);
      toast.error("Failed to load materials");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    try {
      const response = await fetch(`/api/materials/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        toast.success("Material deleted successfully");
        setMaterials((prev) => prev.filter((m) => m.id !== id));
      } else {
        const error = await response.json();
        toast.error(error.error || "Failed to delete material");
      }
    } catch (error) {
      console.error("Delete failed:", error);
      toast.error("Failed to delete material");
    }
  }

  // Filter materials
  const filteredMaterials = materials.filter((material) => {
    const matchesSearch =
      searchQuery === "" ||
      material.title.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesModule =
      selectedModule === "all" || material.module.id === selectedModule;

    const matchesType =
      selectedType === "all" || material.type === selectedType;

    return matchesSearch && matchesModule && matchesType;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold font-display text-neutral-950">
            Materials
          </h1>
          <p className="text-neutral-500 mt-1">
            Manage learning materials for modules
          </p>
        </div>
        <Button asChild>
          <Link href="/materials/new">
            <Plus className="mr-2 h-4 w-4" />
            Create Material
          </Link>
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-4 sm:flex-row sm:justify-end">
        <Select value={selectedModule} onValueChange={setSelectedModule}>
          <SelectTrigger className="w-full sm:w-[200px]">
            <SelectValue placeholder="All Modules" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Modules</SelectItem>
            {modules.map((module) => (
              <SelectItem key={module.id} value={module.id}>
                {module.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={selectedType} onValueChange={setSelectedType}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="All Types" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="VIDEO">Video</SelectItem>
            <SelectItem value="ARTICLE">Article</SelectItem>
            <SelectItem value="CODE_EXAMPLE">Code Example</SelectItem>
            <SelectItem value="INTERACTIVE">Interactive</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Content */}
      {loading ? (
        <div className="space-y-4">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
        </div>
      ) : (
        <MaterialTable materials={filteredMaterials} onDelete={handleDelete} />
      )}
    </div>
  );
}

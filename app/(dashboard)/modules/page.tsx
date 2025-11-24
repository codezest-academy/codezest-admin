"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Search } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/ui/select";
import { ModuleTable } from "@/widgets/modules/module-table";
import { Skeleton } from "@/ui/skeleton";

interface Module {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  order: number;
  createdAt: string;
  language: {
    id: string;
    name: string;
    slug: string;
    icon: string | null;
  };
  _count: {
    materials: number;
    assignments: number;
    mcqQuizzes: number;
  };
}

interface ProgrammingLanguage {
  id: string;
  name: string;
  slug: string;
  icon: string | null;
}

export default function ModulesPage() {
  const [modules, setModules] = useState<Module[]>([]);
  const [languages, setLanguages] = useState<ProgrammingLanguage[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState<string>("all");

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      setLoading(true);
      const [modulesRes, languagesRes] = await Promise.all([
        fetch("/api/modules"),
        fetch("/api/programming-languages"),
      ]);

      if (modulesRes.ok) {
        const modulesData = await modulesRes.json();
        setModules(modulesData);
      }

      if (languagesRes.ok) {
        const languagesData = await languagesRes.json();
        setLanguages(languagesData);
      }
    } catch (error) {
      console.error("Failed to fetch data:", error);
      toast.error("Failed to load modules");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    try {
      const response = await fetch(`/api/modules/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        toast.success("Module deleted successfully");
        setModules((prev) => prev.filter((m) => m.id !== id));
      } else {
        const error = await response.json();
        toast.error(error.error || "Failed to delete module");
      }
    } catch (error) {
      console.error("Delete failed:", error);
      toast.error("Failed to delete module");
    }
  }

  // Filter modules
  const filteredModules = modules.filter((module) => {
    const matchesSearch =
      searchQuery === "" ||
      module.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      module.description?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesLanguage =
      selectedLanguage === "all" || module.language.id === selectedLanguage;

    return matchesSearch && matchesLanguage;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold font-display text-neutral-950">
            Modules
          </h1>
          <p className="text-neutral-500 mt-1">
            Manage learning modules for programming languages
          </p>
        </div>
        <Button asChild>
          <Link href="/modules/new">
            <Plus className="mr-2 h-4 w-4" />
            Create Module
          </Link>
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
          <Input
            placeholder="Search modules..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
          <SelectTrigger className="w-full sm:w-[200px]">
            <SelectValue placeholder="All Languages" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Languages</SelectItem>
            {languages.map((lang) => (
              <SelectItem key={lang.id} value={lang.id}>
                <div className="flex items-center gap-2">
                  {lang.icon && <span>{lang.icon}</span>}
                  <span>{lang.name}</span>
                </div>
              </SelectItem>
            ))}
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
        <ModuleTable modules={filteredModules} onDelete={handleDelete} />
      )}
    </div>
  );
}

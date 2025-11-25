"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";

import { Button } from "@/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/ui/form";
import { Input } from "@/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/card";
import {
  moduleFormSchema,
  type ModuleFormData,
  generateSlug,
} from "@/shared/lib/validations/module-schema";

interface ProgrammingLanguage {
  id: string;
  name: string;
  slug: string;
  icon: string | null;
}

interface ModuleFormProps {
  initialData?: ModuleFormData & { id?: string };
  onSubmit: (data: ModuleFormData) => Promise<void>;
  onCancel: () => void;
  isSubmitting?: boolean;
}

export function ModuleForm({
  initialData,
  onSubmit,
  onCancel,
  isSubmitting = false,
}: ModuleFormProps) {
  const [languages, setLanguages] = useState<ProgrammingLanguage[]>([]);
  const [loadingLanguages, setLoadingLanguages] = useState(true);
  const [autoSlug, setAutoSlug] = useState(!initialData);

  const form = useForm<ModuleFormData>({
    resolver: zodResolver(moduleFormSchema),
    defaultValues: initialData || {
      languageId: "",
      title: "",
      slug: "",
      description: "",
      syllabus: "",
      order: 1,
    },
  });

  // Fetch programming languages
  useEffect(() => {
    async function fetchLanguages() {
      try {
        const response = await fetch("/api/programming-languages");
        if (response.ok) {
          const data = await response.json();
          setLanguages(data);
        }
      } catch (error) {
        console.error("Failed to fetch languages:", error);
      } finally {
        setLoadingLanguages(false);
      }
    }

    fetchLanguages();
  }, []);

  // Auto-generate slug from title
  const handleTitleChange = (value: string) => {
    form.setValue("title", value);
    if (autoSlug) {
      const slug = generateSlug(value);
      form.setValue("slug", slug);
    }
  };

  // Disable auto-slug when user manually edits slug
  const handleSlugChange = (value: string) => {
    form.setValue("slug", value);
    setAutoSlug(false);
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Programming Language */}
            <FormField
              control={form.control}
              name="languageId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Programming Language</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={loadingLanguages}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a programming language" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
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
                  <FormDescription>
                    Select the programming language for this module
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Title */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g., Python Basics"
                      {...field}
                      onChange={(e) => handleTitleChange(e.target.value)}
                    />
                  </FormControl>
                  <FormDescription>
                    The display name for this module
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Slug */}
            <FormField
              control={form.control}
              name="slug"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Slug</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g., python-basics"
                      {...field}
                      onChange={(e) => handleSlugChange(e.target.value)}
                    />
                  </FormControl>
                  <FormDescription>
                    URL-friendly identifier (auto-generated from title)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Order */}
            <FormField
              control={form.control}
              name="order"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Display Order</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min="1"
                      {...field}
                      onChange={(e) =>
                        field.onChange(parseInt(e.target.value, 10))
                      }
                    />
                  </FormControl>
                  <FormDescription>
                    Order in which this module appears in the list
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Description */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description (Optional)</FormLabel>
                  <FormControl>
                    <textarea
                      className="w-full min-h-[100px] rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-xs outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                      placeholder="Brief description of what this module covers..."
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    A brief overview of the module content (max 500 characters)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Syllabus */}
            <FormField
              control={form.control}
              name="syllabus"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Syllabus (Optional)</FormLabel>
                  <FormControl>
                    <textarea
                      className="w-full min-h-[150px] rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-xs outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm font-mono"
                      placeholder="Detailed syllabus or learning objectives..."
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Detailed syllabus or learning objectives (supports markdown)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Actions */}
            <div className="flex gap-4 pt-4">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 sm:flex-none"
              >
                {isSubmitting && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                {initialData ? "Update Module" : "Create Module"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
                disabled={isSubmitting}
                className="flex-1 sm:flex-none"
              >
                Cancel
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

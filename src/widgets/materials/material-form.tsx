"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Video, FileText, Code, Zap } from "lucide-react";

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
  materialFormSchema,
  type MaterialFormData,
  type MaterialTypeValue,
  getContentPlaceholder,
  getContentLabel,
} from "@/shared/lib/validations/material-schema";

interface Module {
  id: string;
  title: string;
  slug: string;
  language: {
    name: string;
  };
}

interface MaterialFormProps {
  initialData?: MaterialFormData & { id?: string };
  onSubmit: (data: MaterialFormData) => Promise<void>;
  onCancel: () => void;
  isSubmitting?: boolean;
}

const materialTypes = [
  { value: "VIDEO", label: "Video", icon: Video },
  { value: "ARTICLE", label: "Article", icon: FileText },
  { value: "CODE_EXAMPLE", label: "Code Example", icon: Code },
  { value: "INTERACTIVE", label: "Interactive", icon: Zap },
] as const;

export function MaterialForm({
  initialData,
  onSubmit,
  onCancel,
  isSubmitting = false,
}: MaterialFormProps) {
  const [modules, setModules] = useState<Module[]>([]);
  const [loadingModules, setLoadingModules] = useState(true);

  const form = useForm<MaterialFormData>({
    resolver: zodResolver(materialFormSchema),
    defaultValues: initialData || {
      moduleId: "",
      title: "",
      type: "VIDEO",
      content: "",
      duration: undefined,
      order: 1,
    },
  });

  const selectedType = form.watch("type") as MaterialTypeValue;

  // Fetch modules
  useEffect(() => {
    async function fetchModules() {
      try {
        const response = await fetch("/api/modules");
        if (response.ok) {
          const data = await response.json();
          setModules(data);
        }
      } catch (error) {
        console.error("Failed to fetch modules:", error);
      } finally {
        setLoadingModules(false);
      }
    }

    fetchModules();
  }, []);

  // Reset duration when type changes
  useEffect(() => {
    if (selectedType !== "VIDEO") {
      form.setValue("duration", undefined);
    }
  }, [selectedType, form]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {initialData ? "Edit Material" : "Create New Material"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Module */}
            <FormField
              control={form.control}
              name="moduleId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Module</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={loadingModules}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a module" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {modules.map((module) => (
                        <SelectItem key={module.id} value={module.id}>
                          <div className="flex flex-col">
                            <span>{module.title}</span>
                            <span className="text-xs text-neutral-500">
                              {module.language.name}
                            </span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Select the module this material belongs to
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
                      placeholder="e.g., Introduction to Variables"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    The display name for this material
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Type */}
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Material Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select material type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {materialTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          <div className="flex items-center gap-2">
                            <type.icon className="h-4 w-4" />
                            <span>{type.label}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Choose the type of learning material
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Content */}
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{getContentLabel(selectedType)}</FormLabel>
                  <FormControl>
                    {selectedType === "ARTICLE" ||
                    selectedType === "CODE_EXAMPLE" ? (
                      <textarea
                        className="w-full min-h-[200px] rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-xs outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm font-mono"
                        placeholder={getContentPlaceholder(selectedType)}
                        {...field}
                      />
                    ) : (
                      <Input
                        placeholder={getContentPlaceholder(selectedType)}
                        {...field}
                      />
                    )}
                  </FormControl>
                  <FormDescription>
                    {selectedType === "VIDEO" && "Enter the URL to the video"}
                    {selectedType === "ARTICLE" &&
                      "Write your article in markdown format"}
                    {selectedType === "CODE_EXAMPLE" &&
                      "Enter the code example"}
                    {selectedType === "INTERACTIVE" &&
                      "Enter the URL to interactive content"}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Duration (only for VIDEO) */}
            {selectedType === "VIDEO" && (
              <FormField
                control={form.control}
                name="duration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Duration (minutes)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="1"
                        placeholder="15"
                        {...field}
                        onChange={(e) => {
                          const value = e.target.value;
                          field.onChange(
                            value ? parseInt(value, 10) : undefined
                          );
                        }}
                        value={field.value || ""}
                      />
                    </FormControl>
                    <FormDescription>Video duration in minutes</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

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
                    Order in which this material appears in the module
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
                {initialData ? "Update Material" : "Create Material"}
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

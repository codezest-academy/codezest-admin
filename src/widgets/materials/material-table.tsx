"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Edit,
  Trash2,
  MoreHorizontal,
  Video,
  FileText,
  Code,
  Zap,
  Clock,
} from "lucide-react";

import { Button } from "@/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/ui/dropdown-menu";
import { Badge } from "@/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/ui/dialog";

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

interface MaterialTableProps {
  materials: Material[];
  onDelete: (id: string) => Promise<void>;
}

const typeConfig = {
  VIDEO: { icon: Video, label: "Video", color: "bg-blue-100 text-blue-700" },
  ARTICLE: {
    icon: FileText,
    label: "Article",
    color: "bg-green-100 text-green-700",
  },
  CODE_EXAMPLE: {
    icon: Code,
    label: "Code",
    color: "bg-purple-100 text-purple-700",
  },
  INTERACTIVE: {
    icon: Zap,
    label: "Interactive",
    color: "bg-orange-100 text-orange-700",
  },
};

export function MaterialTable({ materials, onDelete }: MaterialTableProps) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [materialToDelete, setMaterialToDelete] = useState<Material | null>(
    null
  );
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteClick = (material: Material) => {
    setMaterialToDelete(material);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!materialToDelete) return;

    setIsDeleting(true);
    try {
      await onDelete(materialToDelete.id);
      setDeleteDialogOpen(false);
      setMaterialToDelete(null);
    } catch (error) {
      console.error("Delete failed:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  if (materials.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="rounded-full bg-neutral-100 p-6 mb-4">
          <FileText className="h-12 w-12 text-neutral-400" />
        </div>
        <h3 className="text-lg font-semibold text-neutral-900 mb-2">
          No materials yet
        </h3>
        <p className="text-neutral-500 mb-6">
          Get started by creating your first learning material
        </p>
        <Button asChild>
          <Link href="/materials/new">Create Material</Link>
        </Button>
      </div>
    );
  }

  return (
    <>
      {/* Desktop Table */}
      <div className="hidden md:block rounded-lg border border-neutral-200 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Module</TableHead>
              <TableHead className="text-center">Duration</TableHead>
              <TableHead className="text-center">Order</TableHead>
              <TableHead>Created</TableHead>
              <TableHead className="w-[70px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {materials.map((material) => {
              const config = typeConfig[material.type];
              const Icon = config.icon;

              return (
                <TableRow key={material.id}>
                  <TableCell>
                    <div className="font-medium">{material.title}</div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className={config.color}>
                      <Icon className="mr-1 h-3 w-3" />
                      {config.label}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium text-sm">
                        {material.module.title}
                      </div>
                      <div className="text-xs text-neutral-500">
                        {material.module.language.name}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    {material.duration ? (
                      <div className="flex items-center justify-center gap-1 text-sm text-neutral-600">
                        <Clock className="h-3 w-3" />
                        {material.duration} min
                      </div>
                    ) : (
                      <span className="text-neutral-400">—</span>
                    )}
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge variant="secondary">{material.order}</Badge>
                  </TableCell>
                  <TableCell className="text-sm text-neutral-500">
                    {new Date(material.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon-sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link href={`/materials/${material.id}/edit`}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDeleteClick(material)}
                          className="text-destructive focus:text-destructive"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
        {materials.map((material) => {
          const config = typeConfig[material.type];
          const Icon = config.icon;

          return (
            <div
              key={material.id}
              className="rounded-lg border border-neutral-200 p-4 space-y-3"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold">{material.title}</h3>
                  <p className="text-sm text-neutral-500 mt-1">
                    {material.module.title} • {material.module.language.name}
                  </p>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon-sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link href={`/materials/${material.id}/edit`}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleDeleteClick(material)}
                      className="text-destructive focus:text-destructive"
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <Badge variant="secondary" className={config.color}>
                  <Icon className="mr-1 h-3 w-3" />
                  {config.label}
                </Badge>
                <Badge variant="secondary">Order: {material.order}</Badge>
                {material.duration && (
                  <Badge variant="secondary">
                    <Clock className="mr-1 h-3 w-3" />
                    {material.duration} min
                  </Badge>
                )}
              </div>

              <div className="text-sm text-neutral-500">
                {new Date(material.createdAt).toLocaleDateString()}
              </div>
            </div>
          );
        })}
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Material</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete &quot;{materialToDelete?.title}&quot;? This
              action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteDialogOpen(false)}
              disabled={isDeleting}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleConfirmDelete}
              disabled={isDeleting}
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

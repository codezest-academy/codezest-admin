"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Edit,
  Trash2,
  MoreHorizontal,
  Clock,
  CheckCircle2,
} from "lucide-react";

import { Button } from "@/components/ui/primitives/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/primitives/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/primitives/dropdown-menu";
import { Badge } from "@/components/ui/primitives/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/primitives/dialog";

interface Quiz {
  id: string;
  title: string;
  description: string | null;
  passingScore: number;
  timeLimit: number | null;
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
    questions: number;
    attempts: number;
  };
}

interface QuizTableProps {
  quizzes: Quiz[];
  onDelete: (id: string) => Promise<void>;
}

export function QuizTable({ quizzes, onDelete }: QuizTableProps) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [quizToDelete, setQuizToDelete] = useState<Quiz | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteClick = (quiz: Quiz) => {
    setQuizToDelete(quiz);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!quizToDelete) return;

    setIsDeleting(true);
    try {
      await onDelete(quizToDelete.id);
      setDeleteDialogOpen(false);
      setQuizToDelete(null);
    } catch (error) {
      console.error("Delete failed:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  if (quizzes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="rounded-full bg-neutral-100 p-6 mb-4">
          <CheckCircle2 className="h-12 w-12 text-neutral-400" />
        </div>
        <h3 className="text-lg font-semibold text-neutral-900 mb-2">
          No quizzes yet
        </h3>
        <p className="text-neutral-500 mb-6">
          Get started by creating your first quiz
        </p>
        <Button asChild>
          <Link href="/quizzes/new">Create Quiz</Link>
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
              <TableHead>Module</TableHead>
              <TableHead className="text-center">Questions</TableHead>
              <TableHead className="text-center">Passing Score</TableHead>
              <TableHead className="text-center">Time Limit</TableHead>
              <TableHead>Created</TableHead>
              <TableHead className="w-[70px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {quizzes.map((quiz) => (
              <TableRow key={quiz.id}>
                <TableCell>
                  <div>
                    <div className="font-medium">{quiz.title}</div>
                    {quiz.description && (
                      <div className="text-sm text-neutral-500 line-clamp-1">
                        {quiz.description}
                      </div>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <div>
                    <div className="font-medium text-sm">
                      {quiz.module.title}
                    </div>
                    <div className="text-xs text-neutral-500">
                      {quiz.module.language.name}
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-center">
                  <Badge variant="secondary">{quiz._count.questions}</Badge>
                </TableCell>
                <TableCell className="text-center">
                  <span className="text-sm text-neutral-600">
                    {quiz.passingScore}%
                  </span>
                </TableCell>
                <TableCell className="text-center">
                  {quiz.timeLimit ? (
                    <div className="flex items-center justify-center gap-1 text-sm text-neutral-600">
                      <Clock className="h-3 w-3" />
                      {quiz.timeLimit} min
                    </div>
                  ) : (
                    <span className="text-neutral-400">—</span>
                  )}
                </TableCell>
                <TableCell className="text-sm text-neutral-500">
                  {new Date(quiz.createdAt).toLocaleDateString()}
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
                        <Link href={`/quizzes/${quiz.id}/edit`}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleDeleteClick(quiz)}
                        className="text-destructive focus:text-destructive"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
        {quizzes.map((quiz) => (
          <div
            key={quiz.id}
            className="rounded-lg border border-neutral-200 p-4 space-y-3"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="font-semibold">{quiz.title}</h3>
                {quiz.description && (
                  <p className="text-sm text-neutral-500 line-clamp-2 mt-1">
                    {quiz.description}
                  </p>
                )}
                <p className="text-sm text-neutral-500 mt-1">
                  {quiz.module.title} • {quiz.module.language.name}
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
                    <Link href={`/quizzes/${quiz.id}/edit`}>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleDeleteClick(quiz)}
                    className="text-destructive focus:text-destructive"
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <Badge variant="secondary">
                {quiz._count.questions} Questions
              </Badge>
              <Badge variant="secondary">{quiz.passingScore}% Pass</Badge>
              {quiz.timeLimit && (
                <Badge variant="secondary">
                  <Clock className="mr-1 h-3 w-3" />
                  {quiz.timeLimit} min
                </Badge>
              )}
            </div>

            <div className="text-sm text-neutral-500">
              {new Date(quiz.createdAt).toLocaleDateString()}
            </div>
          </div>
        ))}
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Quiz</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete &quot;{quizToDelete?.title}&quot;? This
              action cannot be undone and will delete all questions and options.
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

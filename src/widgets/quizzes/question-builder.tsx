"use client";

import { useFieldArray, Control } from "react-hook-form";
import { Plus, Trash2, GripVertical } from "lucide-react";

import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import { Checkbox } from "@/ui/checkbox";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/card";
import { Badge } from "@/ui/badge";
import type { QuizFormData } from "@/shared/lib/validations/quiz-schema";
import {
  getOptionLabel,
  getQuestionLabel,
} from "@/shared/lib/validations/quiz-schema";

interface QuestionBuilderProps {
  control: Control<QuizFormData>;
}

export function QuestionBuilder({ control }: QuestionBuilderProps) {
  const {
    fields: questions,
    append: appendQuestion,
    remove: removeQuestion,
  } = useFieldArray({
    control,
    name: "questions",
  });

  const addQuestion = () => {
    appendQuestion({
      question: "",
      explanation: "",
      order: questions.length,
      points: 1,
      options: [
        { optionText: "", isCorrect: false, order: 0 },
        { optionText: "", isCorrect: false, order: 1 },
      ],
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Questions</h3>
        <Button type="button" onClick={addQuestion} variant="outline" size="sm">
          <Plus className="mr-2 h-4 w-4" />
          Add Question
        </Button>
      </div>

      {questions.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-neutral-500 mb-4">No questions added yet</p>
            <Button type="button" onClick={addQuestion} variant="outline">
              <Plus className="mr-2 h-4 w-4" />
              Add Your First Question
            </Button>
          </CardContent>
        </Card>
      )}

      {questions.map((question, questionIndex) => (
        <QuestionCard
          key={question.id}
          questionIndex={questionIndex}
          control={control}
          onRemove={() => removeQuestion(questionIndex)}
        />
      ))}
    </div>
  );
}

interface QuestionCardProps {
  questionIndex: number;
  control: Control<QuizFormData>;
  onRemove: () => void;
}

function QuestionCard({ questionIndex, control, onRemove }: QuestionCardProps) {
  const {
    fields: options,
    append: appendOption,
    remove: removeOption,
  } = useFieldArray({
    control,
    name: `questions.${questionIndex}.options`,
  });

  const addOption = () => {
    if (options.length < 6) {
      appendOption({
        optionText: "",
        isCorrect: false,
        order: options.length,
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <GripVertical className="h-5 w-5 text-neutral-400" />
            <CardTitle className="text-base">
              {getQuestionLabel(questionIndex)}
            </CardTitle>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            onClick={onRemove}
            className="text-destructive hover:text-destructive"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Question Text */}
        <FormField
          control={control}
          name={`questions.${questionIndex}.question`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Question</FormLabel>
              <FormControl>
                <textarea
                  className="w-full min-h-[80px] rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-xs outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                  placeholder="Enter your question..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Points */}
        <FormField
          control={control}
          name={`questions.${questionIndex}.points`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Points</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min="1"
                  {...field}
                  onChange={(e) => field.onChange(parseInt(e.target.value, 10))}
                />
              </FormControl>
              <FormDescription>
                Points awarded for correct answer
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Options */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Options
            </label>
            {options.length < 6 && (
              <Button
                type="button"
                onClick={addOption}
                variant="ghost"
                size="sm"
              >
                <Plus className="mr-2 h-3 w-3" />
                Add Option
              </Button>
            )}
          </div>

          {options.map((option, optionIndex) => (
            <div key={option.id} className="flex items-start gap-3">
              <Badge variant="secondary" className="mt-2.5">
                {getOptionLabel(optionIndex)}
              </Badge>

              <FormField
                control={control}
                name={`questions.${questionIndex}.options.${optionIndex}.optionText`}
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <Input placeholder="Enter option text..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name={`questions.${questionIndex}.options.${optionIndex}.isCorrect`}
                render={({ field }) => (
                  <FormItem className="flex items-center gap-2 space-y-0 mt-2.5">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel className="text-sm font-normal cursor-pointer">
                      Correct
                    </FormLabel>
                  </FormItem>
                )}
              />

              {options.length > 2 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  onClick={() => removeOption(optionIndex)}
                  className="text-destructive hover:text-destructive mt-1.5"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))}

          {options.length < 2 && (
            <p className="text-sm text-destructive">
              At least 2 options are required
            </p>
          )}
        </div>

        {/* Explanation */}
        <FormField
          control={control}
          name={`questions.${questionIndex}.explanation`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Explanation (Optional)</FormLabel>
              <FormControl>
                <textarea
                  className="w-full min-h-[60px] rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-xs outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                  placeholder="Explain the correct answer..."
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Shown to users after they answer
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
}

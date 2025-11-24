"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Github, Linkedin, Twitter, Globe } from "lucide-react";

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
  profileSocialSchema,
  type ProfileSocialData,
} from "@/shared/lib/validations/profile-schema";

interface ProfileSocialFormProps {
  initialData?: ProfileSocialData;
  onSubmit: (data: ProfileSocialData) => Promise<void>;
  isSubmitting?: boolean;
}

export function ProfileSocialForm({
  initialData,
  onSubmit,
  isSubmitting = false,
}: ProfileSocialFormProps) {
  const form = useForm<ProfileSocialData>({
    resolver: zodResolver(profileSocialSchema),
    defaultValues: initialData || {
      website: "",
      githubUrl: "",
      linkedinUrl: "",
      twitterUrl: "",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Website */}
        <FormField
          control={form.control}
          name="website"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Website (Optional)</FormLabel>
              <FormControl>
                <div className="relative">
                  <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
                  <Input
                    placeholder="https://yourwebsite.com"
                    className="pl-9"
                    {...field}
                  />
                </div>
              </FormControl>
              <FormDescription>
                Your personal or professional website
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* GitHub */}
        <FormField
          control={form.control}
          name="githubUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>GitHub (Optional)</FormLabel>
              <FormControl>
                <div className="relative">
                  <Github className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
                  <Input
                    placeholder="https://github.com/username"
                    className="pl-9"
                    {...field}
                  />
                </div>
              </FormControl>
              <FormDescription>Your GitHub profile URL</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* LinkedIn */}
        <FormField
          control={form.control}
          name="linkedinUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>LinkedIn (Optional)</FormLabel>
              <FormControl>
                <div className="relative">
                  <Linkedin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
                  <Input
                    placeholder="https://linkedin.com/in/username"
                    className="pl-9"
                    {...field}
                  />
                </div>
              </FormControl>
              <FormDescription>Your LinkedIn profile URL</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Twitter */}
        <FormField
          control={form.control}
          name="twitterUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Twitter (Optional)</FormLabel>
              <FormControl>
                <div className="relative">
                  <Twitter className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
                  <Input
                    placeholder="https://twitter.com/username"
                    className="pl-9"
                    {...field}
                  />
                </div>
              </FormControl>
              <FormDescription>Your Twitter profile URL</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Save Changes
        </Button>
      </form>
    </Form>
  );
}

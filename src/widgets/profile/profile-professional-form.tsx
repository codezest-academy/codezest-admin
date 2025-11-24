"use client";

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
  profileProfessionalSchema,
  type ProfileProfessionalData,
} from "@/shared/lib/validations/profile-schema";

interface ProfileProfessionalFormProps {
  initialData?: ProfileProfessionalData;
  onSubmit: (data: ProfileProfessionalData) => Promise<void>;
  isSubmitting?: boolean;
}

export function ProfileProfessionalForm({
  initialData,
  onSubmit,
  isSubmitting = false,
}: ProfileProfessionalFormProps) {
  const form = useForm<ProfileProfessionalData>({
    resolver: zodResolver(profileProfessionalSchema),
    defaultValues: initialData || {
      occupation: "",
      company: "",
      phone: "",
      address: "",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Occupation */}
        <FormField
          control={form.control}
          name="occupation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Occupation (Optional)</FormLabel>
              <FormControl>
                <Input placeholder="Software Engineer" {...field} />
              </FormControl>
              <FormDescription>Your current job title or role</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Company */}
        <FormField
          control={form.control}
          name="company"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company (Optional)</FormLabel>
              <FormControl>
                <Input placeholder="Acme Inc." {...field} />
              </FormControl>
              <FormDescription>
                The company or organization you work for
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Phone */}
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number (Optional)</FormLabel>
              <FormControl>
                <Input type="tel" placeholder="+1234567890" {...field} />
              </FormControl>
              <FormDescription>
                Your contact phone number (include country code)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Address */}
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address (Optional)</FormLabel>
              <FormControl>
                <textarea
                  className="w-full min-h-[80px] rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-xs outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                  placeholder="123 Main St, City, Country"
                  {...field}
                />
              </FormControl>
              <FormDescription>Your mailing address</FormDescription>
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

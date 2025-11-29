"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2, Github, Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";
import { useState } from "react";

import { authService } from "@/lib/services/auth.service";
import { oauthService } from "@/lib/services/oauth.service";
import { handleApiError } from "@/lib/utils/error-handler.util";

import { Button } from "@/components/ui/primitives/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/primitives/form";
import { Input } from "@/components/ui/primitives/input";
import { Checkbox } from "@/components/ui/primitives/checkbox";

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(1, {
    message: "Password is required.",
  }),
  remember: z.boolean().default(false),
});

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      remember: false,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await authService.login({
        email: values.email,
        password: values.password,
        remember: values.remember,
      });

      toast.success("Welcome back!");
      router.push("/dashboard");
    } catch (error) {
      const errorMessage = handleApiError(error);
      toast.error(errorMessage);
    }
  }

  const handleGoogleLogin = () => {
    try {
      oauthService.initiateOAuth("google");
    } catch (error) {
      toast.error("Failed to initiate Google login");
    }
  };

  const handleGithubLogin = () => {
    try {
      oauthService.initiateOAuth("github");
    } catch (error) {
      toast.error("Failed to initiate GitHub login");
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-3">
        <h1 className="text-3xl font-bold text-neutral-900">Welcome!</h1>
        <p className="text-neutral-600">Please enter your details to sign in</p>
      </div>

      {/* Login Form */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className="text-sm font-medium text-neutral-700">
                  Email
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="m@example.com"
                    type="email"
                    className="h-11 border-neutral-300 focus:border-primary-500 focus:ring-primary-500 transition-colors"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className="text-sm font-medium text-neutral-700">
                  Password
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      placeholder="enter your password here"
                      type={showPassword ? "text" : "password"}
                      className="h-11 border-neutral-300 focus:border-primary-500 focus:ring-primary-500 transition-colors pr-10"
                      {...field}
                    />
                    <Button
                      variant="ghost"
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="cursor-pointer absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-700 transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />

          <div className="flex items-center justify-between">
            <FormField
              control={form.control}
              name="remember"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="border-neutral-300 data-[state=checked]:bg-primary-600 data-[state=checked]:border-primary-600"
                    />
                  </FormControl>
                  <FormLabel className="text-sm font-normal text-neutral-600 cursor-pointer">
                    Remember for 30 days
                  </FormLabel>
                </FormItem>
              )}
            />
            <Link
              href="/forgot-password"
              className="text-sm font-medium text-primary-600 hover:text-primary-700 hover:underline underline-offset-4 transition-colors"
            >
              Forgot password?
            </Link>
          </div>

          <Button
            type="submit"
            className="w-full h-11 bg-primary-600 hover:bg-primary-700 text-white font-semibold shadow-md hover:shadow-lg transition-all duration-200"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            Sign In
          </Button>
        </form>
      </Form>

      {/* Footer */}
      <div className="flex flex-col space-y-5 pt-1">
        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-neutral-200" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-3 text-neutral-500 font-medium">
              Or continue with
            </span>
          </div>
        </div>

        {/* OAuth Buttons */}
        <div className="grid grid-cols-2 gap-4">
          <Button
            variant="outline"
            onClick={handleGithubLogin}
            type="button"
            className="h-11 border-neutral-300 hover:border-primary-500 hover:bg-primary-50 transition-all duration-200"
          >
            <Github className="mr-2 h-4 w-4" />
            <span className="font-medium">GitHub</span>
          </Button>
          <Button
            variant="outline"
            onClick={handleGoogleLogin}
            type="button"
            className="h-11 border-neutral-300 hover:border-primary-500 hover:bg-primary-50 transition-all duration-200"
          >
            <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            <span className="font-medium">Google</span>
          </Button>
        </div>

        <p className="text-sm text-center text-neutral-600 rounded-lg border border-neutral-200 bg-neutral-50/50 p-4">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="text-primary-600 hover:text-primary-700 font-medium underline-offset-4 hover:underline transition-colors"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

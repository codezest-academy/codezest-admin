import Link from "next/link";
import { Button } from "@/components/ui/primitives/button";
import { ArrowLeft, FileQuestion } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-neutral-50 p-4">
      <div className="text-center space-y-6 max-w-md">
        <div className="flex justify-center">
          <div className="h-24 w-24 bg-neutral-100 rounded-full flex items-center justify-center">
            <FileQuestion className="h-12 w-12 text-neutral-400" />
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-4xl font-bold font-display text-neutral-900">
            Page not found
          </h1>
          <p className="text-neutral-500">
            Sorry, we couldn&apos;t find the page you&apos;re looking for. It
            might have been moved or deleted.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Link href="/">
            <Button
              variant="default"
              size="lg"
              className="w-full sm:w-auto gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Go back home
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              Go to Dashboard
            </Button>
          </Link>
        </div>
      </div>

      <div className="mt-12 text-sm text-neutral-400">Error Code: 404</div>
    </div>
  );
}

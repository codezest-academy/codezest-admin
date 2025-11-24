import Link from "next/link";
import { Button } from "@/ui/button";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b border-neutral-200 bg-white/80 backdrop-blur-xl">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary-600" />
            <span className="text-xl font-bold font-display text-neutral-900">
              CodeZest
            </span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-neutral-600">
            <Link href="#" className="hover:text-primary-600 transition-colors">
              Features
            </Link>
            <Link href="#" className="hover:text-primary-600 transition-colors">
              Pricing
            </Link>
            <Link href="#" className="hover:text-primary-600 transition-colors">
              About
            </Link>
            <Link href="#" className="hover:text-primary-600 transition-colors">
              Blog
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost" size="sm">
                Log in
              </Button>
            </Link>
            <Link href="/register">
              <Button size="sm">Get Started</Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <footer className="border-t border-neutral-200 bg-white py-12">
        <div className="container mx-auto px-4 text-center text-sm text-neutral-500">
          <p>© 2025 CodeZest. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

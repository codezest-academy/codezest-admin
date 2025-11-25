"use client";

import Link from "next/link";
import { Button } from "@/ui/button";
import { Navbar, NavBody } from "@/components/ui/resizable-navbar";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/ui/sheet";
import { Menu, Zap, CreditCard, Users, FileText, X } from "lucide-react";
import { useState, useRef } from "react";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const navLinks = [
    { name: "Features", href: "#features" },
    { name: "Pricing", href: "#pricing" },
    { name: "About", href: "#about" },
    { name: "Blog", href: "#" },
  ];

  return (
    <div className="h-screen flex flex-col w-full bg-neutral-50 overflow-hidden">
      {/* Scrollable Content Area */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto h-full relative">
        {/* Sticky Navbar inside scrollable area */}
        <Navbar scrollContainerRef={scrollRef as React.RefObject<HTMLElement>}>
          <NavBody>
            <div className="flex items-center justify-between w-full">
              {/* Logo */}
              <div className="flex items-center gap-2.5">
                <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-neutral-800 via-neutral-900 to-black shadow-md" />
                <span className="text-lg font-bold font-display text-neutral-900">
                  CodeZest
                </span>
              </div>

              {/* Desktop Navigation */}
              <nav className="hidden md:flex items-center gap-7 text-[13px] font-semibold text-neutral-700">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="hover:text-neutral-900 transition-all duration-200 relative group"
                  >
                    {link.name}
                    <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-neutral-900 rounded-full group-hover:w-full transition-all duration-300"></span>
                  </Link>
                ))}
              </nav>

              {/* Auth Buttons & Mobile Toggle */}
              <div className="flex items-center gap-3">
                <div className="hidden md:flex items-center gap-3">
                  <Link href="/login">
                    <Button
                      size="sm"
                      variant="outline"
                      className="font-semibold px-6 h-9"
                    >
                      LogIn
                    </Button>
                  </Link>
                  <Link href="/register">
                    <Button size="sm" className="font-semibold px-6 h-9">
                      Explore
                    </Button>
                  </Link>
                </div>

                {/* Mobile Menu Button */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden text-neutral-700 hover:text-neutral-900 hover:bg-neutral-200/50"
                  onClick={() => setMobileMenuOpen(true)}
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </NavBody>
        </Navbar>

        {/* Main Content Area */}
        <main className="flex-1">{children}</main>

        {/* Footer */}
        <footer className="border-t border-neutral-200 bg-white py-12">
          <div className="container mx-auto px-4 text-center text-sm text-neutral-500">
            <p>© 2025 CodeZest. All rights reserved.</p>
          </div>
        </footer>
      </div>

      {/* Mobile Menu Sheet */}
      <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
        <SheetContent
          side="left"
          // hideClose={true}
          className="w-full sm:w-[400px] p-0 border-r border-neutral-200"
        >
          <SheetHeader className="sr-only">
            <SheetTitle>Menu</SheetTitle>
            <SheetDescription>Navigate through CodeZest</SheetDescription>
          </SheetHeader>

          <div className="flex flex-col h-full bg-neutral-50">
            {/* Logo Section */}
            <div className="border-b border-neutral-200 py-5 px-6 bg-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="text-xl font-bold font-display text-neutral-900">
                    CodeZest
                  </span>
                </div>
                {/* <Button
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10 sm:h-11 sm:w-11 rounded-full text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <X className="h-6 w-6 sm:h-7 sm:w-7" />
                </Button> */}
              </div>
            </div>

            {/* Navigation Links */}
            <div className="flex-1 overflow-y-auto px-4 py-6">
              <nav className="flex flex-col gap-2">
                {[
                  { name: "Features", href: "#features", icon: Zap },
                  { name: "Pricing", href: "#pricing", icon: CreditCard },
                  { name: "About", href: "#about", icon: Users },
                  { name: "Blog", href: "#", icon: FileText },
                ].map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="flex items-center gap-3 px-4 py-3.5 text-base font-medium text-neutral-600 rounded-xl hover:bg-white hover:text-primary-600 hover:shadow-sm transition-all duration-200"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <link.icon className="h-5 w-5 text-neutral-400 group-hover:text-primary-600 transition-colors" />
                    {link.name}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Auth Buttons */}
            <div className="p-6 border-t border-neutral-200 bg-white">
              <div className="grid grid-cols-2 gap-3">
                <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                  <Button
                    variant="outline"
                    className="w-full font-semibold h-11 border-neutral-200 text-neutral-700 hover:bg-neutral-50 hover:text-neutral-900 rounded-xl"
                  >
                    Log in
                  </Button>
                </Link>
                <Link href="/register" onClick={() => setMobileMenuOpen(false)}>
                  <Button className="w-full font-semibold h-11 bg-primary-600 hover:bg-primary-700 text-white shadow-md shadow-primary-200/50 rounded-xl">
                    Get Started
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}

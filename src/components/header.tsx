"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Layers } from "lucide-react";

export default function Header() {
  return (
    <header className="bg-card/80 backdrop-blur-lg border-b sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2">
              <Layers className="h-7 w-7 text-primary" />
              <span className="text-xl font-bold font-headline text-foreground">
                Host & Go
              </span>
            </Link>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link
              href="/"
              className="transition-colors hover:text-primary"
            >
              Discover
            </Link>
            <Link
              href="/spaces/register"
              className="transition-colors hover:text-primary"
            >
              List a Space
            </Link>
            <Link
              href="/events/create"
              className="transition-colors hover:text-primary"
            >
              Create Event
            </Link>
            <Link
              href="/dashboard"
              className="transition-colors hover:text-primary"
            >
              Dashboard
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Button variant="ghost" asChild>
              <Link href="/login">Sign In</Link>
            </Button>
            <Button asChild>
              <Link href="/signup">Join Now</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}

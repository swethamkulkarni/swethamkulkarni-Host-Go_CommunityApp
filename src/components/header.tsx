
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Layers, Menu } from "lucide-react";
import { useAppContext } from "@/context/AppContext";

const defaultNavItems = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/", label: "Discover" },
  { href: "/spaces/register", label: "List a Space" },
  { href: "/events/create", label: "Create Event" },
];

const attendeeNavItems = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/", label: "Discover" },
];

const hostNavItems = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/spaces/register", label: "List a Space" },
    { href: "/events/create", label: "Create Event" },
];

export default function Header() {
  const { userRole } = useAppContext();

  const getNavItems = () => {
    if (userRole === 'attendee') {
      return attendeeNavItems;
    }
    if (userRole === 'host') {
      return hostNavItems;
    }
    return defaultNavItems;
  }

  const navItems = getNavItems();

  return (
    <header className="bg-card/80 backdrop-blur-lg border-b sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Layers className="h-7 w-7 text-primary" />
            <span className="text-xl font-bold font-headline text-foreground">
              Host & Go
            </span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            {navItems.map((item) => (
              <Link key={item.label} href={item.href} className="transition-colors hover:text-primary">
                {item.label}
              </Link>
            ))}
          </nav>
          
          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <Button variant="ghost" asChild>
              <Link href="/login">Sign In</Link>
            </Button>
            <Button asChild>
              <Link href="/signup">Join Now</Link>
            </Button>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <SheetHeader>
                  <SheetTitle className="sr-only">Menu</SheetTitle>
                  <SheetDescription className="sr-only">A list of navigation links for the site.</SheetDescription>
                </SheetHeader>
                <Link href="/" className="flex items-center gap-2 mb-8">
                    <Layers className="h-7 w-7 text-primary" />
                    <span className="text-xl font-bold font-headline text-foreground">
                        Host & Go
                    </span>
                </Link>
                <nav className="grid gap-6 text-lg font-medium">
                  {navItems.map((item) => (
                    <Link key={item.label} href={item.href} className="text-muted-foreground hover:text-foreground">
                      {item.label}
                    </Link>
                  ))}
                </nav>
                <div className="absolute bottom-8 left-0 right-0 px-6">
                    <div className="grid gap-4">
                        <Button variant="outline" asChild className="w-full">
                            <Link href="/login">Sign In</Link>
                        </Button>
                        <Button asChild className="w-full">
                            <Link href="/signup">Join Now</Link>
                        </Button>
                    </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}

import Link from "next/link";
import { Layers, Twitter, Instagram, Facebook } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground mt-auto">
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <Layers className="h-7 w-7 text-primary" />
              <span className="text-xl font-bold font-headline">
                Host & Go
              </span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Discover unique spaces for your next event.
            </p>
          </div>
          <div>
            <h3 className="font-semibold font-headline">Navigation</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link href="/" className="hover:text-primary">Discover</Link></li>
              <li><Link href="/spaces/register" className="hover:text-primary">List a Space</Link></li>
              <li><Link href="/events/create" className="hover:text-primary">Create an Event</Link></li>
              <li><Link href="/dashboard" className="hover:text-primary">Dashboard</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold font-headline">Support</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link href="#" className="hover:text-primary">Help Center</Link></li>
              <li><Link href="#" className="hover:text-primary">Contact Us</Link></li>
              <li><Link href="#" className="hover:text-primary">Terms of Service</Link></li>
              <li><Link href="#" className="hover:text-primary">Privacy Policy</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold font-headline">Connect</h3>
            <div className="flex mt-4 space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-primary"><Twitter /></Link>
              <Link href="#" className="text-muted-foreground hover:text-primary"><Facebook /></Link>
              <Link href="#" className="text-muted-foreground hover:text-primary"><Instagram /></Link>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Host & Go. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

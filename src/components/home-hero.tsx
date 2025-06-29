
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useAppContext } from "@/context/AppContext";

export default function HomeHero() {
    const { setUserRole } = useAppContext();

    return (
        <section className="py-20 md:py-32 text-center">
            <div className="container mx-auto">
                <h1 className="text-4xl md:text-6xl font-bold font-headline mb-4 text-foreground">Your Community. Your Space.</h1>
                <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
                    Are you here to discover local happenings or to create your own?
                </p>
                <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                    <Button size="lg" asChild className="w-full sm:w-auto" onClick={() => setUserRole('attendee')}>
                        <Link href="#upcoming-events">Find an Event to Attend</Link>
                    </Button>
                    <Button size="lg" variant="outline" asChild className="w-full sm:w-auto" onClick={() => setUserRole('host')}>
                        <Link href="#featured-spaces">Find a Space to Host</Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { Calendar as CalendarIcon, Clock, MapPin, Tag, User, DollarSign } from "lucide-react";
import type { Event, Space } from "@/lib/types";

const mockSpace: Space = {
    id: '1', name: 'The Creative Loft', description: '', address: '123 Fake St, London', postcode: 'E2 8AA', borough: 'Hackney', capacity: 50, amenities: ['wifi', 'projector'], hourlyRate: 100, images: ['/placeholder.png'], ownerId: '', rating: 4.8, category: 'Creative Studio'
};

const mockEvent: Event = {
    id: '1', 
    title: 'Beginner\'s Yoga Workshop', 
    description: 'Join us for a relaxing and informative yoga workshop designed for complete beginners. We will cover fundamental poses, breathing techniques, and mindfulness practices to get you started on your yoga journey. Mats and props will be provided. All are welcome!', 
    category: 'Fitness & Wellness', 
    organizerId: 'org123', 
    spaceId: '1', 
    datetime: new Date('2024-08-15T10:00:00'), 
    duration: 2, 
    price: 25, 
    tags: ['yoga', 'wellness', 'fitness', 'beginner'], 
    image: '/placeholder.png', 
    space: mockSpace 
};

export default function EventDetailPage({ params }: { params: { id: string } }) {
  // Fetch event data based on params.id
  const event = mockEvent;

  return (
    <div className="bg-secondary">
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <Card>
                <CardHeader className="p-0">
                    <Image src="https://placehold.co/800x500.png" data-ai-hint="workshop yoga" alt={event.title} width={800} height={500} className="w-full h-auto object-cover rounded-t-lg" />
                </CardHeader>
                <CardContent className="p-6">
                    <Badge className="mb-4 bg-accent text-accent-foreground">{event.category}</Badge>
                    <h1 className="font-headline text-4xl font-bold mb-4">{event.title}</h1>
                    <div className="prose max-w-none text-foreground/80">
                        <p>{event.description}</p>
                    </div>
                    <hr className="my-6" />
                    <div>
                        <h2 className="font-headline text-2xl font-semibold mb-4">Tags</h2>
                        <div className="flex flex-wrap gap-2">
                            {event.tags.map(tag => (
                                <Badge key={tag} variant="outline"><Tag className="w-3 h-3 mr-1" />{tag}</Badge>
                            ))}
                        </div>
                    </div>
                </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <Card className="sticky top-24 shadow-lg">
                <CardHeader>
                    <CardTitle className="font-headline text-2xl">Event Details</CardTitle>
                    <CardDescription>Hosted by <Link href="#" className="text-primary hover:underline">Organizer Name</Link></CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-start gap-4">
                        <CalendarIcon className="w-5 h-5 mt-1 text-muted-foreground" />
                        <div>
                            <p className="font-semibold">{event.datetime.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                            <p className="text-sm text-muted-foreground">{event.datetime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4">
                        <Clock className="w-5 h-5 mt-1 text-muted-foreground" />
                        <div>
                            <p className="font-semibold">{event.duration} hours</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4">
                        <MapPin className="w-5 h-5 mt-1 text-muted-foreground" />
                        <div>
                            <p className="font-semibold">{event.space.name}</p>
                            <p className="text-sm text-muted-foreground">{event.space.address}</p>
                            <Link href={`/spaces/${event.space.id}`} className="text-sm text-primary hover:underline">View space details</Link>
                        </div>
                    </div>
                     <div className="flex items-start gap-4">
                        <DollarSign className="w-5 h-5 mt-1 text-muted-foreground" />
                        <div>
                            <p className="font-semibold">${event.price > 0 ? event.price : 'Free'}</p>
                        </div>
                    </div>
                    <Button className="w-full mt-6">Register for this Event</Button>
                </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

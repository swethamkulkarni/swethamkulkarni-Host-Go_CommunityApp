
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Users, Calendar as CalendarIcon, Tag, Wifi, ParkingSquare, Projector, Accessibility } from "lucide-react";
import type { Space, Event } from "@/lib/types";
import MapComponent from "@/components/map";
import { ScrollArea } from "@/components/ui/scroll-area";
import HomeHero from "@/components/home-hero";
import { Button } from "@/components/ui/button";

const mockSpaces: Space[] = [
  { id: '1', name: 'The Creative Loft', description: '', address: '123 Fake St, London', postcode: 'E2 8AA', borough: 'Hackney', capacity: 50, amenities: ['wifi', 'projector'], hourlyRate: 100, images: ['https://placehold.co/600x400.png'], ownerId: '', rating: 4.8, category: 'Creative Studio', isAccessible: true, lat: 51.5293, lng: -0.0519 },
  { id: '2', name: 'Rooftop Garden Oasis', description: '', address: '456 Another St, London', postcode: 'SE1 9SG', borough: 'Southwark', capacity: 80, amenities: ['wifi', 'kitchen'], hourlyRate: 150, images: ['https://placehold.co/600x401.png'], ownerId: '', rating: 4.9, category: 'Outdoor Space', isAccessible: true, lat: 51.5045, lng: -0.0865 },
  { id: '3', name: 'Modern Tech Hub', description: '', address: '789 High St, London', postcode: 'EC1Y 8QP', borough: 'Islington', capacity: 120, amenities: ['wifi', 'projector', 'parking'], hourlyRate: 200, images: ['https://placehold.co/600x402.png'], ownerId: '', rating: 4.7, category: 'Meeting Room', isAccessible: false, lat: 51.5256, lng: -0.0905 },
  { id: '4', name: 'Community Hall', description: '', address: '101 Main Rd, London', postcode: 'W11 2ES', borough: 'Kensington', capacity: 100, amenities: ['kitchen', 'parking'], hourlyRate: 75, images: ['https://placehold.co/600x403.png'], ownerId: '', rating: 4.5, category: 'Community Space', isAccessible: true, lat: 51.5126, lng: -0.2039 },
];

const mockEvents: Event[] = [
  { id: '1', title: 'Beginner\'s Yoga Workshop', description: '', category: 'Fitness', organizerId: '', spaceId: '1', datetime: new Date('2024-08-15T10:00:00'), duration: 2, price: 0, tags: ['yoga', 'wellness', 'fitness'], image: 'https://placehold.co/600x400.png', space: mockSpaces[0] },
  { id: '2', title: 'Indie Film Screening', description: '', category: 'Cultural', organizerId: '', spaceId: '2', datetime: new Date('2024-08-20T19:00:00'), duration: 3, price: 0, tags: ['film', 'cinema', 'arts'], image: 'https://placehold.co/600x401.png', space: mockSpaces[1] },
  { id: '3', title: 'Startup Pitch Night', description: '', category: 'Tech', organizerId: '', spaceId: '3', datetime: new Date('2024-08-22T18:30:00'), duration: 4, price: 0, tags: ['tech', 'networking', 'business'], image: 'https://placehold.co/600x402.png', space: mockSpaces[2] },
  { id: '4', title: 'Local Pottery Market', description: '', category: 'Social', organizerId: '', spaceId: '4', datetime: new Date('2024-09-01T11:00:00'), duration: 6, price: 0, tags: ['market', 'crafts', 'community'], image: 'https://placehold.co/600x403.png', space: mockSpaces[3] },
];

const AmenityIcon = ({ amenity }: { amenity: string }) => {
  switch (amenity) {
    case 'wifi': return <Wifi className="w-4 h-4 text-muted-foreground" />;
    case 'projector': return <Projector className="w-4 h-4 text-muted-foreground" />;
    case 'kitchen': return <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground"><path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"/><path d="m22 12-3-9-3 9"/><path d="M16 12h-2a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h2Z"/><path d="M11 12H3"/><path d="M20 16v6"/></svg>;
    case 'parking': return <ParkingSquare className="w-4 h-4 text-muted-foreground" />;
    default: return null;
  }
};


export default function HomePage() {
  return (
    <div>
      <HomeHero />

      <section id="featured-spaces" className="py-16 bg-secondary">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold font-headline mb-8">Featured Spaces</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <div className="lg:sticky lg:top-24">
               <MapComponent 
                center={{ lat: 51.515, lng: -0.09 }}
                zoom={11}
                markers={mockSpaces.map(s => ({ lat: s.lat, lng: s.lng, key: s.id }))}
                className="w-full h-[400px] lg:h-[600px] rounded-lg"
              />
            </div>
            <ScrollArea className="h-auto lg:h-[600px]">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-8 pr-4">
                {mockSpaces.map(space => (
                  <Card key={space.id} className="flex flex-col">
                    <CardHeader className="p-0">
                      <Image 
                        src={space.images[0]} 
                        alt={space.name} 
                        width={600} 
                        height={400} 
                        className="rounded-t-lg object-cover aspect-[3/2]" 
                        data-ai-hint={
                          space.id === '1' ? "creative loft" :
                          space.id === '2' ? "rooftop garden" :
                          space.id === '3' ? "coworking space" :
                          "community hall"
                        } />
                    </CardHeader>
                    <CardContent className="flex-grow pt-6">
                      <Badge variant="secondary" className="mb-2">{space.category}</Badge>
                      <h3 className="font-semibold font-headline text-lg">{space.name}</h3>
                      <div className="text-sm text-muted-foreground flex items-center gap-2 mt-2">
                        <MapPin className="w-4 h-4" />
                        <span>{space.borough}, {space.postcode}</span>
                      </div>
                      <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                            <Users className="w-4 h-4" />
                            <span>Up to {space.capacity} people</span>
                        </div>
                        {space.isAccessible && (
                          <div className="flex items-center gap-2" title="Wheelchair Accessible">
                            <Accessibility className="w-4 h-4" />
                            <span className="sr-only">Wheelchair Accessible</span>
                          </div>
                        )}
                      </div>
                       <div className="flex items-center gap-4 mt-4">
                        {space.amenities.map(amenity => <AmenityIcon key={amenity} amenity={amenity} />)}
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button asChild className="w-full">
                        <Link href={`/spaces/${space.id}`}>View Space</Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </div>
        </div>
      </section>

      <section id="upcoming-events" className="py-16">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold font-headline mb-8">Upcoming Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {mockEvents.map(event => (
              <Card key={event.id} className="flex flex-col">
                <CardHeader className="p-0">
                  <Image 
                    src={event.image} 
                    alt={event.title} 
                    width={600} 
                    height={400} 
                    className="rounded-t-lg object-cover aspect-[3/2]" 
                    data-ai-hint={
                      event.id === '1' ? "yoga class" :
                      event.id === '2' ? "film screening" :
                      event.id === '3' ? "startup pitch" :
                      "pottery market"
                    } />
                </CardHeader>
                <CardContent className="flex-grow pt-6">
                  <Badge className="mb-2">{event.category}</Badge>
                  <h3 className="font-semibold font-headline text-lg">{event.title}</h3>
                  <div className="text-sm text-muted-foreground flex items-center gap-2 mt-2">
                    <CalendarIcon className="w-4 h-4" />
                    <span>{event.datetime.toLocaleDateString()}</span>
                  </div>
                  <div className="text-sm text-muted-foreground flex items-center gap-2 mt-2">
                    <MapPin className="w-4 h-4" />
                    <span>{event.space.name}</span>
                    {event.space.isAccessible && (
                        <Accessibility className="w-4 h-4" title="Wheelchair Accessible"/>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {event.tags.map(tag => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        <Tag className="w-3 h-3 mr-1" />
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full">
                    <Link href={`/events/${event.id}`}>View Event</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

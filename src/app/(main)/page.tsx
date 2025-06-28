import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Users, Calendar as CalendarIcon, Tag, Wifi, ParkingSquare, Projector } from "lucide-react";
import type { Space, Event } from "@/lib/types";

const mockSpaces: Space[] = [
  { id: '1', name: 'The Creative Loft', description: '', address: '', postcode: 'E2 8AA', borough: 'Hackney', capacity: 50, amenities: ['wifi', 'projector'], hourlyRate: 100, images: ['https://placehold.co/600x400.png'], ownerId: '', rating: 4.8, category: 'Creative Studio' },
  { id: '2', name: 'Rooftop Garden Oasis', description: '', address: '', postcode: 'SE1 9SG', borough: 'Southwark', capacity: 80, amenities: ['wifi', 'kitchen'], hourlyRate: 150, images: ['https://placehold.co/600x400.png'], ownerId: '', rating: 4.9, category: 'Outdoor Space' },
  { id: '3', name: 'Modern Tech Hub', description: '', address: '', postcode: 'EC1Y 8QP', borough: 'Islington', capacity: 120, amenities: ['wifi', 'projector', 'parking'], hourlyRate: 200, images: ['https://placehold.co/600x400.png'], ownerId: '', rating: 4.7, category: 'Meeting Room' },
  { id: '4', name: 'Community Hall', description: '', address: '', postcode: 'W11 2ES', borough: 'Kensington', capacity: 100, amenities: ['kitchen', 'parking'], hourlyRate: 75, images: ['https://placehold.co/600x400.png'], ownerId: '', rating: 4.5, category: 'Community Space' },
];

const mockEvents: Event[] = [
  { id: '1', title: 'Beginner\'s Yoga Workshop', description: '', category: 'Fitness', organizerId: '', spaceId: '1', datetime: new Date('2024-08-15T10:00:00'), duration: 2, price: 0, tags: ['yoga', 'wellness', 'fitness'], image: 'https://placehold.co/600x400.png', space: mockSpaces[0] },
  { id: '2', title: 'Indie Film Screening', description: '', category: 'Cultural', organizerId: '', spaceId: '2', datetime: new Date('2024-08-20T19:00:00'), duration: 3, price: 0, tags: ['film', 'cinema', 'arts'], image: 'https://placehold.co/600x400.png', space: mockSpaces[1] },
  { id: '3', title: 'Startup Pitch Night', description: '', category: 'Tech', organizerId: '', spaceId: '3', datetime: new Date('2024-08-22T18:30:00'), duration: 4, price: 0, tags: ['tech', 'networking', 'business'], image: 'https://placehold.co/600x400.png', space: mockSpaces[2] },
  { id: '4', title: 'Local Pottery Market', description: '', category: 'Social', organizerId: '', spaceId: '4', datetime: new Date('2024-09-01T11:00:00'), duration: 6, price: 0, tags: ['market', 'crafts', 'community'], image: 'https://placehold.co/600x400.png', space: mockSpaces[3] },
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
      <section className="py-20 md:py-32 bg-secondary">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold font-headline mb-4">Find Your Third Space</h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">Discover and book unique local spaces for your events, workshops, and gatherings.</p>
          <div className="max-w-4xl mx-auto bg-card p-4 rounded-lg shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
              <Input placeholder="Search by keyword, e.g. 'art studio'" className="md:col-span-2" />
              <Select>
                <SelectTrigger><SelectValue placeholder="Category" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="creative">Creative Studio</SelectItem>
                  <SelectItem value="meeting">Meeting Room</SelectItem>
                  <SelectItem value="outdoor">Outdoor Space</SelectItem>
                  <SelectItem value="community">Community Space</SelectItem>
                </SelectContent>
              </Select>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    Pick a date
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" />
                </PopoverContent>
              </Popover>
              <Button className="md:col-span-4 mt-2 md:mt-0 bg-accent text-accent-foreground hover:bg-accent/90">Search</Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold font-headline mb-8">Featured Spaces</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {mockSpaces.map(space => (
              <Card key={space.id} className="flex flex-col">
                <CardHeader className="p-0">
                  <Image 
                    src={space.images[0]} 
                    alt={space.name} 
                    width={600} 
                    height={400} 
                    className="rounded-t-lg" 
                    data-ai-hint={
                      space.id === '1' ? "creative loft" :
                      space.id === '2' ? "rooftop garden" :
                      space.id === '3' ? "tech hub" :
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
                  <div className="flex items-center gap-2 mt-2">
                    <Users className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Up to {space.capacity} people</span>
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
        </div>
      </section>

      <section className="py-16 bg-secondary">
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
                    className="rounded-t-lg" 
                    data-ai-hint={
                      event.id === '1' ? "yoga class" :
                      event.id === '2' ? "film screening" :
                      event.id === '3' ? "startup pitch" :
                      "pottery market"
                    } />
                </CardHeader>
                <CardContent className="flex-grow pt-6">
                  <Badge className="mb-2 bg-accent text-accent-foreground">{event.category}</Badge>
                  <h3 className="font-semibold font-headline text-lg">{event.title}</h3>
                  <div className="text-sm text-muted-foreground flex items-center gap-2 mt-2">
                    <CalendarIcon className="w-4 h-4" />
                    <span>{event.datetime.toLocaleDateString()}</span>
                  </div>
                  <div className="text-sm text-muted-foreground flex items-center gap-2 mt-2">
                    <MapPin className="w-4 h-4" />
                    <span>{event.space.name}</span>
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

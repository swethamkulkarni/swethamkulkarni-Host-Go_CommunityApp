import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import Image from "next/image";
import { Star, MapPin, Users, Wifi, Projector, ParkingSquare } from "lucide-react";
import type { Space } from "@/lib/types";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

// Mock data, in a real app this would come from a database
const mockSpace: Space = {
    id: '1', 
    name: 'The Creative Loft', 
    description: 'A beautifully restored industrial loft in the heart of Hackney. With exposed brick walls, high ceilings, and an abundance of natural light, it\'s the perfect backdrop for creative workshops, photoshoots, and intimate gatherings. The open-plan layout allows for flexible configurations to suit your event needs.', 
    address: '123 Fake Street, London', 
    postcode: 'E2 8AA', 
    borough: 'Hackney', 
    capacity: 50, 
    amenities: ['wifi', 'projector', 'kitchen', 'parking'], 
    hourlyRate: 100, 
    images: ['https://placehold.co/800x600.png', 'https://placehold.co/800x601.png', 'https://placehold.co/800x602.png', 'https://placehold.co/800x603.png'], 
    ownerId: 'owner123', 
    rating: 4.8, 
    category: 'Creative Studio'
};

const imageHints = ["interior", "details", "window view", "entrance"];

const AmenityIcon = ({ amenity }: { amenity: string }) => {
    switch (amenity) {
      case 'wifi': return <Wifi className="w-5 h-5 text-primary" />;
      case 'projector': return <Projector className="w-5 h-5 text-primary" />;
      case 'kitchen': return <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"/><path d="m22 12-3-9-3 9"/><path d="M16 12h-2a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h2Z"/><path d="M11 12H3"/><path d="M20 16v6"/></svg>;
      case 'parking': return <ParkingSquare className="w-5 h-5 text-primary" />;
      default: return null;
    }
  };

export default function SpaceDetailPage({ params }: { params: { id: string } }) {
  // Fetch space data based on params.id
  const space = mockSpace;

  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          {/* Image Gallery */}
            <Carousel className="w-full rounded-lg overflow-hidden mb-8">
                <CarouselContent>
                    {space.images.map((img, index) => (
                        <CarouselItem key={index}>
                            <Image 
                                src={img} 
                                data-ai-hint={`creative loft ${imageHints[index] || ''}`.trim()} 
                                alt={`${space.name} image ${index + 1}`} 
                                width={800} 
                                height={600} 
                                className="w-full h-auto object-cover aspect-[4/3]" 
                            />
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="hidden sm:flex" />
                <CarouselNext className="hidden sm:flex" />
            </Carousel>
          
          <h1 className="font-headline text-4xl font-bold mb-2">{space.name}</h1>
          <div className="flex items-center gap-4 text-muted-foreground mb-6">
            <div className="flex items-center gap-1">
              <Star className="w-5 h-5 text-accent" />
              <span>{space.rating}</span>
            </div>
            <span>·</span>
            <div className="flex items-center gap-1">
              <MapPin className="w-5 h-5" />
              <span>{space.borough}, {space.postcode}</span>
            </div>
            <span>·</span>
            <div className="flex items-center gap-1">
              <Users className="w-5 h-5" />
              <span>Up to {space.capacity} guests</span>
            </div>
          </div>

          <Badge variant="secondary" className="mb-6">{space.category}</Badge>
          
          <div className="prose max-w-none text-foreground/80">
            <h2 className="font-headline text-2xl font-semibold mb-4">About this space</h2>
            <p>{space.description}</p>
          </div>
          
          <hr className="my-8" />

          <div>
            <h2 className="font-headline text-2xl font-semibold mb-4">Amenities</h2>
            <div className="grid grid-cols-2 gap-4">
              {space.amenities.map(amenity => (
                <div key={amenity} className="flex items-center gap-3">
                  <AmenityIcon amenity={amenity} />
                  <span className="capitalize">{amenity}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        <div className="lg:col-span-1">
            <Card className="sticky top-24 shadow-lg">
                <CardHeader>
                    <CardTitle className="flex items-center justify-between font-headline">
                        <span>Book this Space</span>
                        <div className="flex items-baseline">
                            <span className="text-2xl font-bold">£{space.hourlyRate}</span>
                            <span className="text-sm text-muted-foreground">/hour</span>
                        </div>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground text-sm mb-4">Select a date to check availability.</p>
                    <Calendar
                        mode="single"
                        className="rounded-md border"
                    />
                    <Button className="w-full mt-6 bg-accent text-accent-foreground hover:bg-accent/90">Request to Book</Button>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}

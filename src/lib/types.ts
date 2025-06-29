export interface Space {
  id: string;
  name: string;
  description: string;
  address: string;
  postcode: string;
  borough: string;
  capacity: number;
  amenities: string[];
  hourlyRate: number;
  images: string[];
  ownerId: string;
  rating: number;
  category: string;
  isAccessible?: boolean;
  lat: number;
  lng: number;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  category: string;
  organizerId: string;
  spaceId: string;
  datetime: Date;
  duration: number; // in hours
  price: number;
  tags: string[];
  image: string;
  space: Space;
}

export interface Booking {
  id: string;
  userId: string;
  spaceId: string;
  eventId: string;
  startTime: Date;
  endTime: Date;
  status: 'pending' | 'confirmed' | 'cancelled';
  totalCost: number;
  spaceName: string;
  eventTitle: string;
  image: string;
}

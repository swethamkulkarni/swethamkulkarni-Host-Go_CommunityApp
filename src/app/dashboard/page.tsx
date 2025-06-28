import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { Booking, Event, Space } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";
import { PlusCircle } from "lucide-react";

const mockBookings: Booking[] = [
    { id: 'b1', userId: 'u1', spaceId: 's1', eventId: 'e1', startTime: new Date('2024-08-15T10:00:00'), endTime: new Date('2024-08-15T12:00:00'), status: 'confirmed', totalCost: 50, spaceName: 'The Creative Loft', eventTitle: 'Beginner\'s Yoga Workshop', image: "https://placehold.co/100x100.png" },
    { id: 'b2', userId: 'u1', spaceId: 's2', eventId: 'e2', startTime: new Date('2024-08-20T19:00:00'), endTime: new Date('2024-08-20T22:00:00'), status: 'pending', totalCost: 45, spaceName: 'Rooftop Garden Oasis', eventTitle: 'Indie Film Screening', image: "https://placehold.co/100x100.png" },
];

const mockEvents: Partial<Event>[] = [
    { id: 'e3', title: 'Startup Pitch Night', datetime: new Date('2024-08-22T18:30:00'), category: 'Tech' },
    { id: 'e4', title: 'Local Pottery Market', datetime: new Date('2024-09-01T11:00:00'), category: 'Social' },
];

const mockSpaces: Partial<Space>[] = [
    { id: 's3', name: 'My Warehouse Studio', category: 'Creative Studio', capacity: 150 },
];


export default function DashboardPage() {
    return (
        <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
                <h1 className="font-headline text-4xl font-bold">Your Dashboard</h1>
                <p className="text-muted-foreground">Manage your bookings, events, and spaces all in one place.</p>
            </div>
            <Tabs defaultValue="bookings">
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="bookings">My Bookings</TabsTrigger>
                    <TabsTrigger value="events">My Events</TabsTrigger>
                    <TabsTrigger value="spaces">My Spaces</TabsTrigger>
                </TabsList>
                <TabsContent value="bookings">
                    <Card>
                        <CardHeader>
                            <CardTitle>My Bookings</CardTitle>
                            <CardDescription>A list of events you are attending.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Event</TableHead>
                                        <TableHead>Date & Time</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {mockBookings.map(booking => (
                                        <TableRow key={booking.id}>
                                            <TableCell className="font-medium">
                                                <div className="flex items-center gap-4">
                                                    <Image src={booking.image} data-ai-hint="event booking" alt={booking.eventTitle} width={40} height={40} className="rounded-md" />
                                                    <div>
                                                        <p>{booking.eventTitle}</p>
                                                        <p className="text-sm text-muted-foreground">{booking.spaceName}</p>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>{booking.startTime.toLocaleString()}</TableCell>
                                            <TableCell><Badge variant={booking.status === 'confirmed' ? 'default' : 'secondary'}>{booking.status}</Badge></TableCell>
                                            <TableCell className="text-right">
                                                <Button variant="ghost" size="sm">Cancel</Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="events">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div>
                                <CardTitle>My Events</CardTitle>
                                <CardDescription>Events you are organizing.</CardDescription>
                            </div>
                            <Button asChild><Link href="/events/create"><PlusCircle className="mr-2 h-4 w-4" /> Create Event</Link></Button>
                        </CardHeader>
                        <CardContent>
                             <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Event Title</TableHead>
                                        <TableHead>Date</TableHead>
                                        <TableHead>Category</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {mockEvents.map(event => (
                                        <TableRow key={event.id}>
                                            <TableCell className="font-medium">{event.title}</TableCell>
                                            <TableCell>{event.datetime?.toLocaleDateString()}</TableCell>
                                            <TableCell><Badge variant="outline">{event.category}</Badge></TableCell>
                                            <TableCell className="text-right">
                                                <Button variant="ghost" size="sm">Edit</Button>
                                                <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">Delete</Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="spaces">
                     <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div>
                                <CardTitle>My Spaces</CardTitle>
                                <CardDescription>Spaces you own and manage.</CardDescription>
                            </div>
                            <Button asChild><Link href="/spaces/register"><PlusCircle className="mr-2 h-4 w-4" /> List a New Space</Link></Button>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Space Name</TableHead>
                                        <TableHead>Category</TableHead>
                                        <TableHead>Capacity</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {mockSpaces.map(space => (
                                        <TableRow key={space.id}>
                                            <TableCell className="font-medium">{space.name}</TableCell>
                                            <TableCell>{space.category}</TableCell>
                                            <TableCell>{space.capacity}</TableCell>
                                            <TableCell className="text-right">
                                                <Button variant="ghost" size="sm">Manage</Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}

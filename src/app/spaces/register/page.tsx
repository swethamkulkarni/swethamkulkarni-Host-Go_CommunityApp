import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Accessibility } from "lucide-react";

const amenities = [
    { id: 'wifi', label: 'WiFi' },
    { id: 'projector', label: 'Projector' },
    { id: 'kitchen', label: 'Kitchen' },
    { id: 'parking', label: 'Parking' },
    { id: 'whiteboard', label: 'Whiteboard' },
    { id: 'sound-system', label: 'Sound System' }
];

export default function RegisterSpacePage() {
    return (
        <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8 max-w-4xl">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-3xl">List Your Space</CardTitle>
                    <CardDescription>
                        Join our community of hosts and turn your underutilized space into a new revenue stream.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form className="space-y-8">
                        {/* Section 1: Basic Information */}
                        <div className="space-y-4">
                            <h3 className="font-headline text-xl font-semibold border-b pb-2">Basic Information</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="space-name">Space Name</Label>
                                    <Input id="space-name" placeholder="e.g., The Sun Room" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="space-category">Category</Label>
                                    <Select>
                                        <SelectTrigger><SelectValue placeholder="Select a category" /></SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="creative">Creative Studio</SelectItem>
                                            <SelectItem value="meeting">Meeting Room</SelectItem>
                                            <SelectItem value="outdoor">Outdoor Space</SelectItem>
                                            <SelectItem value="community">Community Space</SelectItem>
                                            <SelectItem value="workshop">Workshop Area</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="space-description">Description</Label>
                                <Textarea id="space-description" placeholder="Tell us about your space..." />
                            </div>
                        </div>

                        {/* Section 2: Location & Capacity */}
                        <div className="space-y-4">
                            <h3 className="font-headline text-xl font-semibold border-b pb-2">Location & Capacity</h3>
                             <div className="space-y-2">
                                <Label htmlFor="address">Address</Label>
                                <Input id="address" placeholder="123 Main Street" />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="borough">Borough</Label>
                                    <Input id="borough" placeholder="e.g., Hackney" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="postcode">Postcode</Label>
                                    <Input id="postcode" placeholder="e.g., E2 8AA" />
                                </div>
                            </div>
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="capacity">Capacity</Label>
                                    <Input id="capacity" type="number" placeholder="50" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="hourly-rate">Hourly Rate (£)</Label>
                                    <Input id="hourly-rate" type="number" placeholder="100" />
                                </div>
                            </div>
                        </div>

                        {/* Section 3: Amenities */}
                        <div className="space-y-4">
                            <h3 className="font-headline text-xl font-semibold border-b pb-2">Amenities & Accessibility</h3>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                {amenities.map(amenity => (
                                    <div key={amenity.id} className="flex items-center space-x-2">
                                        <Checkbox id={`amenity-${amenity.id}`} />
                                        <Label htmlFor={`amenity-${amenity.id}`} className="font-normal">{amenity.label}</Label>
                                    </div>
                                ))}
                            </div>
                            <div className="pt-4">
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="amenity-accessible" />
                                    <Label htmlFor="amenity-accessible" className="font-normal flex items-center gap-2">
                                        <Accessibility className="w-4 h-4" />
                                        Wheelchair Accessible
                                    </Label>
                                </div>
                            </div>
                        </div>
                        
                        {/* Section 4: Photos */}
                        <div className="space-y-4">
                            <h3 className="font-headline text-xl font-semibold border-b pb-2">Photos</h3>
                             <div className="space-y-2">
                                <Label htmlFor="photos">Upload Images</Label>
                                <Input id="photos" type="file" multiple />
                                <p className="text-sm text-muted-foreground">Add up to 5 photos. High-quality images get more bookings.</p>
                            </div>
                        </div>

                        <div className="pt-4">
                            <Button type="submit" size="lg" className="w-full md:w-auto">Submit for Review</Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}

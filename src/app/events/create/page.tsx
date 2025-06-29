"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CalendarIcon, Sparkles, Tag, X, PartyPopper } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { suggestKeywords } from "@/ai/flows/smart-keyword-suggestions";

export default function CreateEventPage() {
    const { toast } = useToast();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [keywords, setKeywords] = useState<string[]>([]);
    const [suggestedKeywords, setSuggestedKeywords] = useState<string[]>([]);
    const [isSuggesting, setIsSuggesting] = useState(false);
    const [newKeyword, setNewKeyword] = useState('');

    const handleSuggestKeywords = async () => {
        if (!title || !description) {
            toast({
                title: "Title and Description needed",
                description: "Please provide a title and description to suggest keywords.",
                variant: "destructive",
            });
            return;
        }
        setIsSuggesting(true);
        try {
            const result = await suggestKeywords({ title, description });
            setSuggestedKeywords(result.keywords);
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to suggest keywords. Please try again.",
                variant: "destructive",
            });
        } finally {
            setIsSuggesting(false);
        }
    };

    const addKeyword = (keyword: string) => {
        if (keyword && !keywords.includes(keyword)) {
            setKeywords([...keywords, keyword]);
        }
    };
    
    const handleAddCustomKeyword = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && newKeyword.trim()) {
            e.preventDefault();
            addKeyword(newKeyword.trim());
            setNewKeyword('');
        }
    }

    const removeKeyword = (keywordToRemove: string) => {
        setKeywords(keywords.filter(keyword => keyword !== keywordToRemove));
    };

    return (
        <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8 max-w-4xl">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-3xl">Create a New Event</CardTitle>
                    <CardDescription>
                        Fill out the details below to share your event with the community.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form className="space-y-8">
                        <div className="space-y-4">
                            <h3 className="font-headline text-xl font-semibold border-b pb-2">Event Details</h3>
                            <Alert>
                                <PartyPopper className="h-4 w-4" />
                                <AlertTitle>Community First!</AlertTitle>
                                <AlertDescription>
                                    All events on Host & Go are free to ensure they are accessible to everyone in the community.
                                </AlertDescription>
                            </Alert>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="event-title">Event Title</Label>
                                    <Input id="event-title" placeholder="e.g., Summer Solstice Yoga" value={title} onChange={(e) => setTitle(e.target.value)} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="event-category">Category</Label>
                                    <Select>
                                        <SelectTrigger><SelectValue placeholder="Select a category" /></SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="workshop">Workshop</SelectItem>
                                            <SelectItem value="social">Social</SelectItem>
                                            <SelectItem value="educational">Educational</SelectItem>
                                            <SelectItem value="cultural">Cultural</SelectItem>
                                            <SelectItem value="fitness">Fitness</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="event-description">Description</Label>
                                <Textarea id="event-description" placeholder="Describe your event..." value={description} onChange={(e) => setDescription(e.target.value)} />
                            </div>
                        </div>

                         <div className="space-y-4">
                            <h3 className="font-headline text-xl font-semibold border-b pb-2">Keywords & Discovery</h3>
                            <Label>AI Keyword Suggestions</Label>
                            <div className="p-4 border rounded-lg bg-secondary/50">
                                <p className="text-sm text-muted-foreground mb-4">Add a title and description, then let our AI suggest relevant keywords to help people find your event.</p>

                                <Button type="button" onClick={handleSuggestKeywords} disabled={isSuggesting}>
                                    <Sparkles className="mr-2 h-4 w-4" />
                                    {isSuggesting ? 'Thinking...' : 'Suggest Keywords'}
                                </Button>
                                {suggestedKeywords.length > 0 && (
                                    <div className="mt-4">
                                        <p className="text-sm font-medium mb-2">Click to add a suggested keyword:</p>
                                        <div className="flex flex-wrap gap-2">
                                            {suggestedKeywords.map((kw, i) => (
                                                <Badge key={i} variant="secondary" className="cursor-pointer hover:bg-primary hover:text-primary-foreground" onClick={() => addKeyword(kw)}>
                                                    {kw}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="keywords">Event Keywords</Label>
                                <div className="flex flex-wrap gap-2 p-2 border rounded-md min-h-[40px]">
                                    {keywords.map(kw => (
                                        <Badge key={kw}>
                                            {kw}
                                            <X className="ml-2 h-3 w-3 cursor-pointer" onClick={() => removeKeyword(kw)} />
                                        </Badge>
                                    ))}
                                    <Input 
                                      id="keywords" 
                                      placeholder="Add keyword and press Enter" 
                                      className="flex-1 border-none shadow-none focus-visible:ring-0 h-auto p-0"
                                      value={newKeyword}
                                      onChange={(e) => setNewKeyword(e.target.value)}
                                      onKeyDown={handleAddCustomKeyword}
                                      />
                                </div>
                                <p className="text-sm text-muted-foreground">Add tags that describe your event. Press Enter to add a new tag.</p>
                            </div>
                        </div>

                         <div className="space-y-4">
                            <h3 className="font-headline text-xl font-semibold border-b pb-2">Date, Time & Location</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Date</Label>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                        <Button variant="outline" className="w-full justify-start text-left font-normal">
                                            <CalendarIcon className="mr-2 h-4 w-4" /> Pick a date
                                        </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0">
                                            <Calendar mode="single" />
                                        </PopoverContent>
                                    </Popover>
                                </div>
                                 <div className="space-y-2">
                                    <Label htmlFor="time">Time</Label>
                                    <Input id="time" type="time" />
                                </div>
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="space-id">Space</Label>
                                <Select>
                                    <SelectTrigger><SelectValue placeholder="Select a space for your event" /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="1">The Creative Loft</SelectItem>
                                        <SelectItem value="2">Rooftop Garden Oasis</SelectItem>
                                        <SelectItem value="3">Modern Tech Hub</SelectItem>
                                    </SelectContent>
                                </Select>
                                <p className="text-sm text-muted-foreground">Don't have a space? <Link href="/" className="text-primary hover:underline">Discover spaces</Link> first.</p>
                            </div>
                        </div>

                        <div className="pt-4">
                            <Button type="submit" size="lg" className="w-full md:w-auto">Create Event</Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}

import { CalendarDays, MapPin, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

const FEATURED_EVENTS = [
    {
        title: "AI in 2025 Summit",
        description: "Explore the future of artificial intelligence with industry leaders.",
        date: "Oct 15, 2025",
        location: "San Francisco, CA",
        attendees: "500+",
        image: "/summit.jpg",
        category: "Technology"
    },
    {
        title: "Sustainable Living Expo",
        description: "Discover eco-friendly products and practices for a better tomorrow.",
        date: "Nov 22, 2025",
        location: "Austin, TX",
        attendees: "200+",
        image: "/SustainableLivingExpo.jpg",
        category: "Lifestyle"
    },
    {
        title: "Global Art Fair",
        description: "A showcase of contemporary art from around the globe.",
        date: "Dec 05, 2025",
        location: "New York, NY",
        attendees: "1000+",
        image: "https://images.unsplash.com/photo-1536924940846-227afb31e2a5?q=80&w=2066&auto=format&fit=crop",
        category: "Art"
    }
]

export default function FeaturedEventsSection() {
    return (
        <section className="container px-4 md:px-6 py-16">
            <div className="flex flex-col items-center justify-between gap-4 md:flex-row mb-10">
                <div className="space-y-1">
                    <h2 className="text-3xl font-bold tracking-tight">Trending Events</h2>
                    <p className="text-muted-foreground">
                        Don't miss out on these popular upcoming gatherings.
                    </p>
                </div>
                <Button variant="ghost" className="hidden md:inline-flex">View all</Button>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {FEATURED_EVENTS.map((event, index) => (
                    <Card key={index} className="overflow-hidden border-none shadow-md hover:shadow-xl transition-all duration-300 group">
                        <div className="relative aspect-video overflow-hidden">
                            <Image
                                src={event.image}
                                alt={event.title}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            <div className="absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm">
                                {event.category}
                            </div>
                        </div>
                        <CardHeader>
                            <CardTitle className="line-clamp-1">{event.title}</CardTitle>
                            <CardDescription className="line-clamp-2">{event.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-2 text-sm text-muted-foreground">
                                <div className="flex items-center gap-2">
                                    <CalendarDays className="h-4 w-4 text-primary" />
                                    <span>{event.date}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <MapPin className="h-4 w-4 text-primary" />
                                    <span>{event.location}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Users className="h-4 w-4 text-primary" />
                                    <span>{event.attendees} Joining</span>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button className="w-full">Book Ticket</Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </section>
    );
}

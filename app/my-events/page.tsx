"use client";

import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import EventCard from "@/app/components/EventCard";
import { Loader2, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Id } from "@/convex/_generated/dataModel";
import { Button } from "@/components/ui/button";

export default function MyEventsPage() {
    const events = useQuery(api.events.getMyEvents);
    const deleteEvent = useMutation(api.events.deleteEvent);
    const [deletingId, setDeletingId] = useState<Id<"events"> | null>(null);

    const handleDelete = async (eventId: Id<"events">) => {
        if (!confirm("Are you sure you want to delete this event? This action cannot be undone.")) return;

        setDeletingId(eventId);
        try {
            await deleteEvent({ eventId });
            toast.success("Event deleted successfully");
        } catch (error) {
            console.error("Delete failed:", error);
            toast.error("Failed to delete event", {
                description: "Something went wrong. Please try again."
            });
        } finally {
            setDeletingId(null);
        }
    };

    if (events === undefined) {
        return (
            <div className="flex h-[50vh] items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
        );
    }

    return (
        <div className="container py-8 max-w-7xl mx-auto px-4">
            <h1 className="text-3xl font-bold mb-8">My Organized Events</h1>

            {events.length === 0 ? (
                <div className="text-center py-16 bg-muted/30 rounded-lg border border-dashed">
                    <h3 className="text-lg font-medium text-muted-foreground">No events created yet</h3>
                    <p className="text-sm text-muted-foreground mt-1">Go to the generator to create your first event!</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {events.map((event) => (
                        <div key={event._id} className="group relative">
                            <EventCard event={event} />

                            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-background/80 backdrop-blur-sm rounded-md p-1">
                                <Button
                                    variant="destructive"
                                    size="icon"
                                    className="h-8 w-8"
                                    disabled={deletingId === event._id}
                                    onClick={(e) => {
                                        e.preventDefault(); // Prevent Link navigation from card
                                        handleDelete(event._id);
                                    }}
                                >
                                    {deletingId === event._id ? (
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                    ) : (
                                        <Trash2 className="h-4 w-4" />
                                    )}
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

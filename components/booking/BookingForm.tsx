'use client';

import { useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUser } from "@clerk/nextjs";
import { Loader2, Ticket } from "lucide-react";
import { toast } from 'sonner';
import { Id } from "@/convex/_generated/dataModel";

interface BookingFormProps {
    eventId: Id<"events">;
    eventTitle: string;
}

export default function BookingForm({ eventId, eventTitle }: BookingFormProps) {
    const { user } = useUser();
    const createRegistration = useMutation(api.registrations.create);

    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // Form state
    // Pre-fill with user data if available, otherwise allow manual entry
    const [name, setName] = useState(user?.fullName || "");
    const [email, setEmail] = useState(user?.primaryEmailAddress?.emailAddress || "");

    const handleBook = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            await createRegistration({
                eventId,
                ticketType: "free",
                attendeeName: name,
                attendeeEmail: email,
            });
            setOpen(false);
            toast.success("Ticket Booked!", {
                description: "Your reservation has been confirmed. Check your tickets page.",
            });
        } catch (error: any) {
            console.error("Booking error:", error);
            toast.error("Booking Failed", {
                description: error.message || "Could not book ticket. Please try again."
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="w-full gap-2">
                    <Ticket className="w-4 h-4" />
                    Book Ticket
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Book Ticket</DialogTitle>
                    <DialogDescription>
                        Reserve your spot for <span className="font-semibold text-foreground">{eventTitle}</span>.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleBook} className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                            id="name"
                            value={name}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                            placeholder="John Doe"
                            required
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                            placeholder="john@example.com"
                            required
                        />
                    </div>

                    <DialogFooter>
                        <Button type="submit" disabled={isLoading}>
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Booking...
                                </>
                            ) : "Confirm Booking"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}

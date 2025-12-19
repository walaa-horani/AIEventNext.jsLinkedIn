'use client';

import { useState } from 'react';
import { AIEventGenerator } from '@/components/ai-event-generator';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ChevronLeft, Loader2, Save } from 'lucide-react';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function AIEventGeneratorPage() {
    const router = useRouter();
    const createEvent = useMutation(api.events.create);
    const [generatedEvent, setGeneratedEvent] = useState<{
        name: string;
        description: string;
        category: string;
    } | null>(null);
    const [isSaving, setIsSaving] = useState(false);

    const handleSaveEvent = async () => {
        if (!generatedEvent) return;

        setIsSaving(true);
        try {
            await createEvent({
                title: generatedEvent.name,
                description: generatedEvent.description,
                category: generatedEvent.category,
                tags: ["AI Generated", generatedEvent.category],
                startDate: Date.now() + 86400000, // Starts tomorrow
                endDate: Date.now() + 86400000 + 7200000, // 2 hours duration
                timezone: "UTC",
                locationType: "online", // Default to online for AI events
                city: "Online",
                country: "Global",
                capacity: 100,
                ticketType: "free",
                coverImage: "https://images.unsplash.com/photo-1540575467063-17e6fc8a6a44?q=80&w=2070&auto=format&fit=crop", // Default placeholder
            });

            // Redirect to explore page after saving
            router.push('/explore');

        } catch (error: any) {
            console.error("Failed to save event:", error);

            // Check for specific error message
            if (error.message.includes("Free plan allows only 1 event")) {
                toast.error("Free Plan Limit Reached", {
                    description: "You have already created 1 event. Please upgrade to create more.",
                    duration: 5000,
                    action: {
                        label: "Upgrade",
                        onClick: () => router.push('/pricing') // Assuming there is a pricing page or similar
                    }
                });
            } else {
                toast.error("Failed to create event", {
                    description: "Something went wrong. Please check your connection and try again.",
                });
            }
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-3xl">
            <div className="mb-6">
                <Link href="/">
                    <Button variant="ghost" className="gap-2 pl-0 hover:bg-transparent hover:text-primary">
                        <ChevronLeft className="h-4 w-4" />
                        Back to Dashboard
                    </Button>
                </Link>
            </div>

            <div className="space-y-6">
                <div className="text-center space-y-2">
                    <h1 className="text-3xl font-bold tracking-tight">AI Event Creator</h1>
                    <p className="text-muted-foreground">
                        Describe your event idea and let our AI assistant draft the details for you.
                    </p>
                </div>

                <AIEventGenerator
                    onEventGenerated={(event) => {
                        console.log("Event generated:", event);
                        setGeneratedEvent(event);
                    }}
                />

                {generatedEvent && (
                    <div className="flex justify-end animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <Button
                            size="lg"
                            onClick={handleSaveEvent}
                            disabled={isSaving}
                            className="w-full sm:w-auto"
                        >
                            {isSaving ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Creating Event...
                                </>
                            ) : (
                                <>
                                    <Save className="mr-2 h-4 w-4" />
                                    Create Event
                                </>
                            )}
                        </Button>
                    </div>
                )}

                <div className="bg-muted/50 rounded-lg p-6 text-sm text-muted-foreground">
                    <h3 className="font-semibold mb-2 text-foreground">How it works</h3>
                    <ul className="list-disc list-inside space-y-1">
                        <li>Type a description of your event (topic, target audience, location, vibe).</li>
                        <li>Click "Generate Event" and wait for the AI to work its magic.</li>
                        <li>Review the generated details and click "Create Event" to save it to our platform.</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

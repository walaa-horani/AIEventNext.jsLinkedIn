"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Loader2, CalendarDays, MapPin, QrCode } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function MyTicketsPage() {
    const registrations = useQuery(api.registrations.getMyRegistrations);

    if (registrations === undefined) {
        return (
            <div className="flex h-[50vh] items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
        );
    }

    return (
        <div className="container py-8 max-w-7xl mx-auto px-4">
            <h1 className="text-3xl font-bold mb-8">My Tickets</h1>

            {registrations.length === 0 ? (
                <div className="text-center py-16 bg-muted/30 rounded-lg border border-dashed">
                    <h3 className="text-lg font-medium text-muted-foreground">No tickets found</h3>
                    <p className="text-sm text-muted-foreground mt-1">Browse events and book your first ticket!</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {registrations.map((reg) => (
                        <Card key={reg._id} className="overflow-hidden flex flex-col h-full border-l-4 border-l-primary/60">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-xl">{reg.event?.title || "Unknown Event"}</CardTitle>
                                <p className="text-sm text-muted-foreground">Reference: {reg._id.slice(0, 8)}...</p>
                            </CardHeader>
                            <CardContent className="space-y-4 flex-1">
                                {reg.event?.coverImage && (
                                    <div className="relative h-32 w-full rounded-md overflow-hidden bg-muted">
                                        <Image
                                            src={reg.event.coverImage}
                                            alt={reg.event.title}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                )}
                                <div className="space-y-2 text-sm">
                                    <div className="flex items-center gap-2">
                                        <CalendarDays className="h-4 w-4 text-primary" />
                                        <span>
                                            {reg.event?.startDate ? new Date(reg.event.startDate).toLocaleDateString() : 'TBA'}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <MapPin className="h-4 w-4 text-primary" />
                                        <span>{reg.event?.city || 'Online'}</span>
                                    </div>
                                    <div className="flex items-center gap-2 mt-4 p-3 bg-muted/50 rounded-lg border border-dashed">
                                        <QrCode className="h-10 w-10 text-foreground" />
                                        <div className="flex-1 min-w-0">
                                            <p className="font-mono text-xs truncate" title={reg.qrCode}>{reg.qrCode}</p>
                                            <p className="text-xs text-muted-foreground">Scan at entry</p>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter className="pt-0">
                                <Button variant="outline" className="w-full">
                                    Download Ticket
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}

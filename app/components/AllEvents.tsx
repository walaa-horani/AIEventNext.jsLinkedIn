"use client"

import { api } from '@/convex/_generated/api'
import { useQuery } from 'convex/react'
import React from 'react'
import EventCard from './EventCard'
import { Button } from '@/components/ui/button'

export default function AllEvents() {
    const events = useQuery(api.events.getFeaturedEvents, {
        limit: 20,
    })

    if (!events) return null


    return (
        <section className='space-y-6'>
            <h2 className="text-2xl font-bold my-8">📅 All Upcoming Events</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {events.map((event) => (
                    <EventCard key={event._id} event={event} />
                ))}
            </div>

            {events.length === 0 && (
                <div className="text-center py-10 text-muted-foreground">
                    No upcoming events found. Be the first to create one!
                </div>
            )}
        </section>
    )
}

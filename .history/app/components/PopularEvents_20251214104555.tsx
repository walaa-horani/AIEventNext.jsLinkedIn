"use client"

import { api } from "@/convex/_generated/api"
import { useQuery } from "convex/react"
import EventCard from "./EventCard"

export function PopularEvents() {
  const events = useQuery(api.events.getPopularEvents, {
    limit: 6,
  })

  if (!events) return null

  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-bold">🔥 Popular Events</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {events.map((event) => (
          <EventCard key={event._id} event={event} />
        ))}
      </div>
    </section>
  )
}

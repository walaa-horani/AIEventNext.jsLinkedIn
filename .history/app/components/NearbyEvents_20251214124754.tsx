"use client"

import { api } from "@/convex/_generated/api"
import { useQuery } from "convex/react"
import EventCard from "./EventCard"

type NearbyEventsProps = {
  city?: string
  state?: string | null
}

export function NearbyEvents({ city, state }: NearbyEventsProps) {
  const events = useQuery(api.events.getEventByLocation, {
    city,
    state: state ?? undefined,
    limit: 4,
  })

  if (!events) return null

  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-bold my-8">
        📍 Near {city}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {events.map((event) => (
          <EventCard key={event._id} event={event} />
        ))}
      </div>
    </section>
  )
}

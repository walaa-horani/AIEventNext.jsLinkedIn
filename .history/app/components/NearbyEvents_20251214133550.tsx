"use client"

import { api } from "@/convex/_generated/api"
import { useQuery } from "convex/react"
import EventCard from "./EventCard"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { generateLocationSlug } from "@/lib/location"

type NearbyEventsProps = {
  city?: string
  slug?: string
}
export function NearbyEvents({city,slug}: NearbyEventsProps) {
  const events = useQuery(api.events.getEventByLocation, {
    city: city,
    limit: 4,
  })
  const locationSlug = city
  ? generateLocationSlug(city, city)
  : null

  if (!events) return null

  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-bold my-8">📍 Near You</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {events.map((event) => (
          <EventCard key={event._id} event={event} />
        ))}
      </div>
      <div className="flex justify-end pt-4">
      {locationSlug && (
  <Link href={`/explore/${locationSlug}`}>
    <Button variant="ghost">
      See all →
    </Button>
  </Link>
)}

      </div>
    </section>
  )
}

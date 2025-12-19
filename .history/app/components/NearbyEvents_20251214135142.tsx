"use client"

import { api } from "@/convex/_generated/api"
import { useQuery } from "convex/react"
import EventCard from "./EventCard"
import Link from "next/link"
import { Button } from "@/components/ui/button"


type slugProps ={
  slug:string
}
export function NearbyEvents({slug}:slugProps) {
  const events = useQuery(api.events.getEventByLocation, {
    city: "Istanbul",
    limit: 4,
  
  })

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
        <Link href={`/explore/${slug}`}>
          <Button variant="ghost">
            See all →
          </Button>
        </Link>
      </div>
    </section>
  )
}

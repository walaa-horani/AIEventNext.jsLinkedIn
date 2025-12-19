"use client"

import EventCard from "@/app/components/EventCard"
import { api } from "@/convex/_generated/api"
import { CATEGORIES } from "@/lib/data"
import { parseLocationSlug } from "@/lib/location"
import { useQuery } from "convex/react"
import { notFound, useParams } from "next/navigation"

export default function ExploreSlug() {
  const params = useParams()
  const slug = params.slug

  if (!slug || Array.isArray(slug)) notFound()

  // 🔹 هل slug هو Category؟
  const isCategory = CATEGORIES.some(
    (cat) => cat.id === slug
  )

  // 🔹 إذا مو Category → Location
  const { city, state, isValid } = !isCategory
    ? parseLocationSlug(slug)
    : { city: null, state: null, isValid: true }

  if (!isCategory && !isValid) notFound()

  // 🔹 اختر Query حسب النوع
  const events = useQuery(
    isCategory
      ? api.events.getEventByCategory
      : api.events.getEventByLocation,
    isCategory
      ? { category: slug }
      : { city: city ?? undefined, state: state ?? undefined }
  )

  if (!events) return null

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 space-y-8">
      <div>
        <h1 className="text-3xl font-bold">
          {isCategory
            ? `Events in ${slug}`
            : `Events in ${city}, ${state}`}
        </h1>
        <p className="text-muted-foreground">
          {events.length} events found
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <EventCard key={event._id} event={event} />
        ))}
      </div>
    </div>
  )
}

"use client"

import { CATEGORIES } from "@/lib/data"
import { parseLocationSlug } from "@/lib/location"
import { notFound, useParams } from "next/navigation"
import { api } from "@/convex/_generated/api"
import { useQuery } from "convex/react"
import { Loader } from "lucide-react"
import EventCard from "@/app/components/EventCard"

export default function ExploreSlugPage() {
  const params = useParams()
  const slug = params.slug

  if (!slug || Array.isArray(slug)) notFound()

  // 1️⃣ هل هو Category؟
  const categoryInfo = CATEGORIES.find((cat) => cat.id === slug)
  const isCategory = !!categoryInfo

  // 2️⃣ إذا مو Category → اعتبره Location
  const { city, state, isValid } = !isCategory
    ? parseLocationSlug(slug)
    : { city: null, state: null, isValid: true }

  if (!isCategory && !isValid) notFound()

  // 3️⃣ Query حسب النوع
  const events = useQuery(
    isCategory
      ? api.events.getEventByCategory
      : api.events.getEventByLocation,
    isCategory
      ? { category: slug }
      : { city: city!, state: state! }
  )

  if (!events) return null

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">
          {isCategory
            ? categoryInfo?.name
            : `Events in ${city}, ${state}`}
        </h1>
        <p className="text-muted-foreground mt-1">
          {events.length} upcoming events
        </p>
      </div>

      {/* Events Grid */}
      {events.length === 0 ? (
        <Loader />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <EventCard key={event._id} event={event} />
          ))}
        </div>
      )}
    </div>
  )
}

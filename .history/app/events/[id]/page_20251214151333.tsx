"use client"

import { api } from "@/convex/_generated/api"
import { useQuery } from "convex/react"
import { notFound, useParams } from "next/navigation"
import { Calendar, MapPin, Ticket } from "lucide-react"

export default function EventDetailsPage() {
  const params = useParams()
  const id = params.id

  if (!id || Array.isArray(id)) notFound()

  const event = useQuery(api.events.getEventById, {
    id,
  })

  if (!event) return null
  if (!event) notFound()

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 space-y-8">
      
      {/* Cover */}
      {event.coverImage && (
        <div className="rounded-3xl overflow-hidden">
          <img
            src={event.coverImage}
            alt={event.title}
            className="w-full h-[320px] object-cover"
          />
        </div>
      )}

      {/* Title */}
      <div className="space-y-2">
        <h1 className="text-4xl font-bold">{event.title}</h1>
        <p className="text-muted-foreground">{event.description}</p>
      </div>

      {/* Meta */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 border rounded-2xl p-6">
        <MetaItem icon={<Calendar />} label="Date">
          {new Date(event.startDate).toLocaleString()}
        </MetaItem>

        <MetaItem icon={<MapPin />} label="Location">
          {event.city}, {event.state}
        </MetaItem>

        <MetaItem icon={<Ticket />} label="Ticket">
          {event.ticketType === "free"
            ? "Free"
            : `$${event.ticketPrice}`}
        </MetaItem>
      </div>
    </div>
  )
}

function MetaItem({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode
  label: string
  children: React.ReactNode
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="p-2 bg-muted rounded-lg">{icon}</div>
      <div>
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="font-medium">{children}</p>
      </div>
    </div>
  )
}

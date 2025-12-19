import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Id } from '@/convex/_generated/dataModel'
import BookingForm from '@/components/booking/BookingForm'

type Event = {
  _id: Id<"events">
  title: string
  city: string
  country: string
  startDate: number
  registrationCount: number
  coverImage?: string
  capacity?: number // Added capacity if available in type
}

function EventCard({ event }: { event: Event }) {
  return (
    <Card className="hover:shadow-lg transition flex flex-col h-full">
      {/* IMAGE - Clickable to details */}
      <Link href={`/events/${event._id}`} className="block relative h-44 w-full bg-muted overflow-hidden rounded-t-xl">
        <Image
          src={event.coverImage || "/placeholder-event.jpg"}
          alt={event.title}
          fill
          className="object-cover hover:scale-105 transition-transform duration-500"
        />
      </Link>

      <CardHeader>
        <Link href={`/events/${event._id}`} className="hover:underline">
          <CardTitle className="text-lg line-clamp-1">
            {event.title}
          </CardTitle>
        </Link>
      </CardHeader>

      <CardContent className="space-y-2 text-sm text-muted-foreground flex-1">
        <p>
          📍 {event.city}, {event.country}
        </p>

        <p>
          🗓 {new Date(event.startDate).toLocaleDateString()}
        </p>

        <p>
          👥 {event.registrationCount} / {event.capacity || "?"} registered
        </p>
      </CardContent>

      <CardFooter className="pt-0 mt-auto">
        <BookingForm eventId={event._id} eventTitle={event.title} />
      </CardFooter>
    </Card>
  )
}

export default EventCard
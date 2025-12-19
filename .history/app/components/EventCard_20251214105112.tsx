import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'



type Event = {
    _id: string
    title: string
    city: string
    country: string
    startDate: number
    registrationCount: number
  }
function EventCard({ event }: { event: Event }) {


  return (
    <Card className="hover:shadow-lg transition">
      <CardHeader>
        <CardTitle className="text-lg line-clamp-1">
          {event.title}
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-2 text-sm text-muted-foreground">
        <p>
          📍 {event.city}, {event.country}
        </p>

        <p>
          🗓 {new Date(event.startDate).toLocaleDateString()}
        </p>

        <p>
          👥 {event.registrationCount} registered
        </p>
      </CardContent>
    </Card>
  )
}

export default EventCard
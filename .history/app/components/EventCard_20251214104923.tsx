import Image from "next/image"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

type Event = {
  _id: string
  title: string
  city: string
  country: string
  startDate: number
  registrationCount: number
  coverImage?: string
}

function EventCard({ event }: { event: Event }) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition">
      {/* IMAGE */}
      <div className="relative h-44 w-full bg-muted">
        <Image
          src={event.coverImage || "/placeholder-event.jpg"}
          alt={event.title}
          fill
          className="object-cover"
        />
      </div>

      <CardHeader className="pb-2">
        <CardTitle className="text-lg line-clamp-1">
          {event.title}
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-2 text-sm text-muted-foreground">
        <p>📍 {event.city}, {event.country}</p>
        <p>🗓 {new Date(event.startDate).toLocaleDateString()}</p>
        <p>👥 {event.registrationCount} registered</p>
      </CardContent>
    </Card>
  )
}

export default EventCard

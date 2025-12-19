"use client"

import React from 'react'
import { api } from '@/convex/_generated/api'
import { useQuery } from 'convex/react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Image from 'next/image'

function FeaturedCarouesel() {
  const events = useQuery(api.events.getFeaturedEvents, {
    limit: 6,
  })

  if (!events) return null

  return (
    <section className="space-y-6 w-full">
      <h2 className="text-2xl font-bold my-8">⭐ Featured Events</h2>
      
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {events.map((event) => (
            <CarouselItem key={event._id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
              <div className="p-1">
                <Card className="hover:shadow-lg transition">
                  {/* IMAGE */}
                  <div className="relative h-44 w-full bg-muted">
                    <Image
                      src={event.coverImage || "/placeholder-event.jpg"}
                      alt={event.title}
                      fill
                      className="object-cover"
                    />
                  </div>
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
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </section>
  )
}

export default FeaturedCarouesel
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
import EventCard from './EventCard'

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
              <EventCard event={event} />
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
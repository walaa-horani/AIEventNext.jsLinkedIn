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
     
      
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {events.map((event) => (
           <CarouselItem key={event._id} className="basis-full">
           <Card className="overflow-hidden">
             {/* IMAGE */}
             <div className="relative h-[420px] w-full">
               <Image
                 src={event.coverImage || "/placeholder-event.jpg"}
                 alt={event.title}
                 fill
                 className="object-cover"
                 priority
               />
         
               {/* Overlay */}
               <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />
         
               {/* TEXT */}
               <div className="absolute bottom-0 p-6 text-white space-y-2">
                 <h3 className="text-2xl font-bold">
                   {event.title}
                 </h3>
                 <p className="text-sm opacity-90">
                   📍 {event.city}, {event.country}
                 </p>
               </div>
             </div>
           </Card>
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
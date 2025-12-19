"use client"

import { api } from '@/convex/_generated/api'
import { useQuery } from 'convex/react'
import React from 'react'
import EventCard from './EventCard'

function FeaturedEvents() {
    const events = useQuery(api.events.getFeaturedEvents, {
        limit: 4,
      })

      if (!events) return null


  return (
    <section className='space-y-6'>
         <h2 className="text-2xl font-bold">⭐ Featured Events</h2>

<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
  {events.map((event) => (
    <EventCard key={event._id} event={event} />
  ))}
</div>
        
    </section>
  )
}

export default FeaturedEvents
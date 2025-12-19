import { api } from '@/convex/_generated/api'
import { useQuery } from 'convex/react'
import React from 'react'

function FeaturedEvents() {
    const data =   useQuery(api.events.getFeaturedEvents)

  return (
    <div>FeaturedEvents</div>
  )
}

export default FeaturedEvents
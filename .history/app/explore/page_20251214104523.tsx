import { api } from '@/convex/_generated/api'
import { useQuery } from 'convex/react'
import React from 'react'
import FeaturedEvents from '../components/FeaturedEvents'
import { NearbyEvents } from '../components/NearbyEvents'
import { PopularEvents } from '../components/PopularEvents'

function Explore() {

  return (
    <div className='gap-6'>
        <FeaturedEvents/>
        <NearbyEvents/>
        <PopularEvents/>
    </div>
  )
}

export default Explore
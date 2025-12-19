"use client"
import FeaturedEvents from '../components/FeaturedEvents'
import { NearbyEvents } from '../components/NearbyEvents'
import { PopularEvents } from '../components/PopularEvents'
import FeaturedCarouesel from '../components/FeaturedCarouesel'
import { useParams } from 'next/navigation'
import CategoriesEvent from '../components/CategoriesEvent'

import AllEvents from '../components/AllEvents'

function Explore() {
  return (
    <div className="container mx-auto px-4 py-8">
      <FeaturedCarouesel />

      <FeaturedEvents />
      <NearbyEvents />
      <CategoriesEvent />
      <PopularEvents />
      <AllEvents />
    </div>
  )
}

export default Explore
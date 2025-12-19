"use client"
import FeaturedEvents from '../components/FeaturedEvents'
import { NearbyEvents } from '../components/NearbyEvents'
import { PopularEvents } from '../components/PopularEvents'
import FeaturedCarouesel from '../components/FeaturedCarouesel'
import { useParams } from 'next/navigation'
import CategoriesEvent from '../components/CategoriesEvent'

function Explore() {
  return (
    <div>
      <FeaturedCarouesel/>

        <FeaturedEvents/>
        <NearbyEvents />
        <CategoriesEvent/>
        <PopularEvents/>
    </div>
  )
}

export default Explore
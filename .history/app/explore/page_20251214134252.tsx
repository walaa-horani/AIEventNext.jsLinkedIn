"use client"
import FeaturedEvents from '../components/FeaturedEvents'
import { NearbyEvents } from '../components/NearbyEvents'
import { PopularEvents } from '../components/PopularEvents'
import FeaturedCarouesel from '../components/FeaturedCarouesel'
import { useParams } from 'next/navigation'

function Explore() {
  const params = useParams()

  const city =
    typeof params.city === "string" ? params.city : undefined
  return (
    <div>
      <FeaturedCarouesel/>

        <FeaturedEvents/>
        <NearbyEvents />
        <PopularEvents/>
    </div>
  )
}

export default Explore
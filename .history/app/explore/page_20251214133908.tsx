"use client"

import { useParams } from "next/navigation"
import FeaturedCarouesel from "../components/FeaturedCarouesel"
import FeaturedEvents from "../components/FeaturedEvents"
import { NearbyEvents } from "../components/NearbyEvents"
import { PopularEvents } from "../components/PopularEvents"

function Explore() {
  const params = useParams()

  const city =
    typeof params.city === "string" ? params.city : undefined

  return (
    <div>
      <FeaturedCarouesel />
      <FeaturedEvents />
      <NearbyEvents city={city} />
      <PopularEvents />
    </div>
  )
}

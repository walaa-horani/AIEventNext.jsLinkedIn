"use client"
import FeaturedEvents from '../components/FeaturedEvents'
import { NearbyEvents } from '../components/NearbyEvents'
import { PopularEvents } from '../components/PopularEvents'
import FeaturedCarouesel from '../components/FeaturedCarouesel'
import { redirect, useParams } from 'next/navigation'
import CategoriesEvent from '../components/CategoriesEvent'
import { useStoreUserEffect } from '@/hooks/user-store'

function Explore() {
  const { user, isLoading } = useStoreUserEffect()

  if (isLoading) return null

  if (!user?.hasCompletedOnboarding) {
    redirect("/onboarding")
  }
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
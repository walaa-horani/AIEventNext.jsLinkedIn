"use client"

import { useEffect, useState } from "react"
import { api } from "@/convex/_generated/api"
import { useQuery } from "convex/react"

import FeaturedCarouesel from "../components/FeaturedCarouesel"
import FeaturedEvents from "../components/FeaturedEvents"
import { NearbyEvents } from "../components/NearbyEvents"
import CategoriesEvent from "../components/CategoriesEvent"
import { PopularEvents } from "../components/PopularEvents"
import OnBoardingModal from "../components/OnBoardingModal"

export default function Explore() {
  const user = useQuery(api.users.getMe)
  const [open, setOpen] = useState(false)

  // ⏳ أثناء التحميل
  if (user === undefined) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        Loading...
      </div>
    )
  }

  // 🔓 إذا مو مسجل دخول
  if (user === null) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        Please sign in to explore events
      </div>
    )
  }

  // 🎯 فتح المودال إذا onboarding مو مكتمل
  useEffect(() => {
    if (!user.hasCompletedOnboarding) {
      setOpen(true)
    }
  }, [user])

  return (
    <>
      {/* 🔹 Onboarding Modal */}
      <OnBoardingModal
        open={open}
        onClose={() => setOpen(false)}
      />

      {/* 🔹 Explore Content */}
      <div className={open ? "blur-sm pointer-events-none" : ""}>
        <FeaturedCarouesel />
        <FeaturedEvents />
        <NearbyEvents />
        <CategoriesEvent />
        <PopularEvents />
      </div>
    </>
  )
}

"use client"

import { CATEGORIES } from "@/lib/data"
import { parseLocationSlug } from "@/lib/location"
import { notFound, useParams } from "next/navigation"
import { NearbyEvents } from "@/app/components/NearbyEvents"

function ExploreSlug() {
  const params = useParams()
  const slug = params.slug

  if (!slug || Array.isArray(slug)) {
    notFound()
  }

  const slugString = slug as string

  const categoryInfo = CATEGORIES.find(
    (cat) => cat.id === slugString
  )
  const isCategory = !!categoryInfo

  const { city, isValid } = !isCategory
    ? parseLocationSlug(slugString)
    : { city: null, isValid: true }

  if (!isCategory && !isValid) {
    notFound()
  }

  // ✅ مرّر slug هنا
  if (!isCategory && city) {
    return (
      <NearbyEvents
        city={city}
        slug={slugString}
      />
    )
  }

  return <div>Category page</div>
}

export default ExploreSlug

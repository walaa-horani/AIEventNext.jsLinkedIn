"use client"
import { CATEGORIES } from '@/lib/data'
import { parseLocationSlug } from '@/lib/location'
import { notFound, useParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import React from 'react'

function ExploreSlug() {

  const params = useParams()
  const router = useRouter()
  const slug = params.slug


  const categoryInfo = CATEGORIES.find((cat)=> cat.id === slug)
  const isCategory = !!categoryInfo;

    // If not a category, validate location
    const { city, state, isValid } = !isCategory
    ? parseLocationSlug(slug)
    : { city: null, state: null, isValid: true };

  // If it's not a valid category and not a valid location, show 404
  if (!isCategory && !isValid) {
    notFound();
  }


  return (
    <div>slug</div>
  )
}

export default ExploreSlug
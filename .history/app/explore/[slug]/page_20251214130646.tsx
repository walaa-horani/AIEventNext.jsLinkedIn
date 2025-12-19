"use client"
import { CATEGORIES } from '@/lib/data'
import { useParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import React from 'react'

function ExploreSlug() {

  const params = useParams()
  const router = useRouter()
  const slug = params.slug


  const categoryInfo = CATEGORIES.find((cat)=> cat.id === slug)
  const isCategory = !!categoryInfo;


  return (
    <div>slug</div>
  )
}

export default ExploreSlug
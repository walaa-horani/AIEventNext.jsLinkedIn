"use client"
import { useParams } from 'next/navigation'
import { useRouter } from 'next/router'
import React from 'react'

function ExploreSlug() {

  const params = useParams()
  const router = useRouter()
  const slug = params.slug

  return (
    <div>slug</div>
  )
}

export default ExploreSlug
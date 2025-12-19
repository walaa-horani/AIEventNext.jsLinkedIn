import { NearbyEvents } from "@/app/components/NearbyEvents"
import { parseLocationSlug } from "@/lib/location"
import { notFound } from "next/navigation"

export default function ExploreLocationPage({
  params,
}: {
  params: { location: string }
}) {
  const { city, state, isValid } = parseLocationSlug(params.location)

  if (!isValid || !city) notFound()

  return <NearbyEvents city={city} state={state} />
}

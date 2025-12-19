import { State, City } from "country-state-city"

type ParsedLocation = {
  city: string | null
  state: string | null
  isValid: boolean
}

/**
 * Parse and validate location slug (format: city-state)
 * Example: istanbul-istanbul
 */
export function parseLocationSlug(slug: string): ParsedLocation {
  if (!slug || typeof slug !== "string") {
    return { city: null, state: null, isValid: false }
  }

  const parts = slug.split("-")

  if (parts.length < 2) {
    return { city: null, state: null, isValid: false }
  }

  // City = first part
  const cityName =
    parts[0].charAt(0).toUpperCase() + parts[0].slice(1)

  // State = remaining parts (can be multi-word)
  const stateName = parts
    .slice(1)
    .map(
      (p) => p.charAt(0).toUpperCase() + p.slice(1)
    )
    .join(" ")

  // 🇹🇷 Get Turkish states
  const turkishStates = State.getStatesOfCountry("TR")

  const stateObj = turkishStates.find(
    (s) => s.name.toLowerCase() === stateName.toLowerCase()
  )

  if (!stateObj) {
    return { city: null, state: null, isValid: false }
  }

  // Get cities of the state
  const cities = City.getCitiesOfState("TR", stateObj.isoCode)

  const cityExists = cities.some(
    (c) => c.name.toLowerCase() === cityName.toLowerCase()
  )

  if (!cityExists) {
    return { city: null, state: null, isValid: false }
  }

  return {
    city: cityName,
    state: stateName,
    isValid: true,
  }
}

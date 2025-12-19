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
  const cityName = parts[0].charAt(0).toUpperCase() + parts[0].slice(1)

  // State = remaining parts (can be multi-word)
  const stateName = parts
    .slice(1)
    .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
    .join(" ")

  console.log('Parsing slug:', { slug, cityName, stateName })

  // 🇹🇷 Get Turkish states
  const turkishStates = State.getStatesOfCountry("TR")
  console.log('Turkish states:', turkishStates.map(s => s.name))

  const stateObj = turkishStates.find(
    (s) => s.name.toLowerCase() === stateName.toLowerCase()
  )

  console.log('Found state:', stateObj)

  if (!stateObj) {
    // If state not found, but it's a known location (like Istanbul-Istanbul), 
    // still allow it - some cities share the same name as their state
    console.warn(`State not found: ${stateName}`)
    
    // For major Turkish cities that are also states, allow them
    const majorCities = ['Istanbul', 'Ankara', 'Izmir', 'Antalya', 'Bursa']
    if (majorCities.includes(cityName) && cityName === stateName) {
      return {
        city: cityName,
        state: stateName,
        isValid: true
      }
    }
    
    return { city: null, state: null, isValid: false }
  }

  // Get cities of the state
  const cities = City.getCitiesOfState("TR", stateObj.isoCode)
  console.log('Cities in state:', cities.map(c => c.name))

  const cityExists = cities.some(
    (c) => c.name.toLowerCase() === cityName.toLowerCase()
  )

  console.log('City exists:', cityExists)

  if (!cityExists) {
    // Special case: if city name matches state name (like Istanbul-Istanbul)
    if (cityName.toLowerCase() === stateName.toLowerCase()) {
      return {
        city: cityName,
        state: stateName,
        isValid: true
      }
    }
    return { city: null, state: null, isValid: false }
  }

  return {
    city: cityName,
    state: stateName,
    isValid: true,
  }
}

/**
 * Generate location slug from city and state (format: city-state)
 * Example: generateLocationSlug("Istanbul", "Istanbul") => "istanbul-istanbul"
 */
export function generateLocationSlug(city: string, state: string): string {
  if (!city || !state) {
    return ""
  }
  
  const citySlug = city.toLowerCase().replace(/\s+/g, "-")
  const stateSlug = state.toLowerCase().replace(/\s+/g, "-")
  
  return `${citySlug}-${stateSlug}`
}
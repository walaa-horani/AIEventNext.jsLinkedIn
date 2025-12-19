import React from 'react'

function FeaturedEvents() {
    const data =   useQuery(api.events.getFeaturedEvents)

  return (
    <div>FeaturedEvents</div>
  )
}

export default FeaturedEvents
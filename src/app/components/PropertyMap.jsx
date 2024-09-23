'use client'
import { useState, useEffect } from 'react'
import * as opencage from 'opencage-api-client'
import Map from '@/src/app/components/Map'

const PropertyMap = ({ property }) => {
  const [viewport, setViewport] = useState({ lat: 0, lng: 0, zoom: 12 })
  const [loading, setLoading] = useState(true)
  const [geoError, setGeoError] = useState(false)

  useEffect(() => {
    fromAddress()
  }, [])

  const fromAddress = async () => {
    try {
      const res = await opencage.geocode({
        key: process.env.NEXT_PUBLIC_GEOCODING_API_KEY,
        q: `${property.location.street}, ${property.location.city}, ${property.location.state}`,
      })

      if (res.results.length === 0) {
        setGeoError(true)
        return
      }

      setViewport({
        ...viewport,
        lat: res.results[0].geometry.lat,
        lng: res.results[0].geometry.lng,
        formatted: res.results[0].formatted,
      })
    } catch (error) {
      console.log(error)
      setGeoError(true)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <h3>Loading...</h3>
  if (geoError) return <div className="text-xl">No location data found</div>

  return <Map {...viewport} />
}

export default PropertyMap

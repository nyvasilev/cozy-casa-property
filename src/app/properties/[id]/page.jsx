'use client'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { getSingleProperty } from '@/src/service'

const PropertiesPage = () => {
  const { id } = useParams()

  const [property, setProperty] = useState(null)
  const [loading, setLoading] = useState(true)

  console.log('property', property)

  useEffect(() => {
    if (property === null) {
      fetchProperty(id)
    }
  }, [id, property])

  const fetchProperty = async (propertyId) => {
    if (!id) return

    try {
      const propertyRes = await getSingleProperty(propertyId)

      setProperty(propertyRes)
    } catch (error) {
      console.log('Error fetching property', error)
    } finally {
      setLoading(false)
    }
  }

  return <div>PropertiesPage id</div>
}

export default PropertiesPage

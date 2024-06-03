import { endpoints } from './apiEndpoints'

export const getProperties = async () => {
  try {
    if (!endpoints.api) return []

    const res = await fetch(endpoints.properties.getData)

    if (!res.ok) {
      throw new Error('Failed to fetch properties')
    }

    return res.json()
  } catch (error) {
    console.log(error)
    return []
  }
}

export const getSingleProperty = async (id) => {
  try {
    if (!endpoints.api) return null

    const res = await fetch(endpoints.properties.getProperty.url(id))

    if (!res.ok) {
      throw new Error('Failed to fetch property')
    }

    return res.json()
  } catch (error) {
    console.log(error)
    return null
  }
}

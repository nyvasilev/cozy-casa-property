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

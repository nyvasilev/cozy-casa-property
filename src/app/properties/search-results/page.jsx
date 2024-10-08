import connectDB from '@/config/database'
import Property from '@/src/models/Property'
import { convertToSerializableObject } from '@/src/utils'

const SearchResultsPage = async ({ searchParams: { location, propertyType } }) => {
  await connectDB()

  const locationPattern = new RegExp(location, 'i')

  let query = {
    $or: [
      { name: locationPattern },
      { description: locationPattern },
      { 'location.street': locationPattern },
      { 'location.city': locationPattern },
      { 'location.state': locationPattern },
      { 'location.zipCode': locationPattern },
    ],
  }

  if (propertyType && propertyType !== 'All') {
    const typePattern = new RegExp(propertyType, 'i')
    query.type = typePattern
  }

  const propertiesQueryResults = await Property.find(query).lean()
  const properties = convertToSerializableObject(propertiesQueryResults)

  console.log(properties)

  return <div>SearchResultsPage</div>
}

export default SearchResultsPage

import PropertyCard from '../components/PropertyCard'

async function fetchProperties() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_DOMAIN}/properties`,
      { cache: 'no-store' },
      { next: { revalidate: 5 } },
    )
    if (!res.ok) {
      throw new Error('Failed to fetch properties')
    }

    return res.json()
  } catch (error) {
    console.log(error)
  }
}

const PropertiesPage = async () => {
  const properties = await fetchProperties()

  console.log(properties)

  return (
    <section className="px-4 py-6">
      <div className="container-xl lg:container m-auto px-4 py-6">
        {!properties.length ? (
          <p className="text-center text-gray-500">No properties found.</p>
        ) : (
          <div className="grid gri-cols-1 md:grid-cols-3 gap-6">
            {properties.map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default PropertiesPage

import PropertyCard from 'components/PropertyCard'
import properties from '/properties.json'

const PropertiesPage = () => (
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

export default PropertiesPage

'use client'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { FaArrowLeft } from 'react-icons/fa'
import { getSingleProperty } from '@/src/service'
import PropertyHeaderImage from '@/src/app/components/PropertyHeaderImage'
import PropertyDetails from '@/src/app/components/PropertyDetails'
import PropertyImages from '@/src/app/components/PropertyImages'
import PropertyContactForm from '@/src/app/components/PropertyContactForm'
import BookmarkProperty from '@/src/app/components/BookmarkProperty'
import ShareButtons from '@/src/app/components/ShareButtons'
import Spinner from '@/src/app/components/Spinner'

const PropertiesPage = () => {
  const { id } = useParams()

  const [property, setProperty] = useState(null)
  const [loading, setLoading] = useState(true)

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

  if (!property && !loading)
    return <h1 className="text-center text-2xl font-bold ml-10">Property not found</h1>

  return (
    <>
      {loading && <Spinner loading={loading} />}
      {!loading && property && (
        <>
          <PropertyHeaderImage image={property.images[0]} />
          <section>
            <div className="container m-auto py-6 px-6">
              <Link
                href="/properties"
                className="text-blue-500 hover:text-blue-600 flex-items-center">
                <FaArrowLeft className="inline mr-2" /> Back to properties
              </Link>
            </div>
          </section>

          <section className="bg-blue-50">
            <div className="container m-auto py-10 px-6">
              <div className="grid grid-cols-1 md:grid-cols-70/30 gap-6">
                <PropertyDetails property={property} />
                <div>
                  <BookmarkProperty />
                  <ShareButtons />
                  <PropertyContactForm />
                </div>
              </div>
            </div>
          </section>
          <PropertyImages images={property.images} />
        </>
      )}
    </>
  )
}

export default PropertiesPage

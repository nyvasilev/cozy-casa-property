import React, { useEffect, useRef } from 'react'
import { MapContainer, Marker, Popup, TileLayer, FeatureGroup } from 'react-leaflet'
import { images } from '@/src/common/enums'

// import Leaflet's CSS
import 'leaflet/dist/leaflet.css'

const redIcon = L.icon({
  iconUrl: images.propertyPin,
  iconSize: [25, 41], // size of the icon
  iconAnchor: [12, 40], // point of the icon which will correspond to marker's location
})

const ResultMap = (props) => {
  const mapRef = useRef(null)
  const groupRef = useRef(null)

  const position = [40, 0]

  useEffect(() => {
    const map = mapRef.current
    const group = groupRef.current
    if (map && group) {
      map.fitBounds(group.getBounds())
    }
  }, [props])

  console.log('props', props)

  return (
    <MapContainer ref={mapRef} center={position} zoom={2} className="h-96">
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <FeatureGroup ref={groupRef}>
        <Marker position={{ lat: props.lat, lng: props.lng }} icon={redIcon}>
          <Popup>{props.formatted}</Popup>
        </Marker>
      </FeatureGroup>
    </MapContainer>
  )
}

export default ResultMap

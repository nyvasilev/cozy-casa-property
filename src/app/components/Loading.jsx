'use client'
import ClipLoader from 'react-spinners/ClipLoader'

const override = {
  display: 'block',
  MdMargin: '100px auto',
}

export const Loading = ({ loading }) => {
  return (
    <ClipLoader
      color={'#3b82f6'}
      loading={loading}
      cssOverride={override}
      size={150}
      aria-label="Loading Spinner"
    />
  )
}

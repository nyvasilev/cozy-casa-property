'use client'
import { useState, useEffect } from 'react'
import { useFormState } from 'react-dom'
import { toast } from 'react-toastify'
import { useSession } from 'next-auth/react'
import { addMessage } from '@/src/app/actions'
import SubmitMessageButton from './SubmitMessgeButton'

const PropertyContactForm = ({ property }) => {
  const { data: session } = useSession()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [phone, setPhone] = useState('')
  const [wasSubmitted, setWasSubmitted] = useState(false)
  const [state, formAction] = useFormState(addMessage, {})

  if (state.submited) {
    return <p className="text-gree-500 mb-4">Your message has been sent</p>
  }

  useEffect(() => {
    if (state.error) toast.error(state.error)
    if (state.submited) toast.success('Message sent successfully')
  }, [state])

  const handleSubmit = async (e) => {
    e.preventDefault()

    const data = {
      name,
      email,
      phone,
      message,
      recipient: property.owner,
      property: property._id,
    }

    try {
      const res = await fetch('/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (res.status === 200) {
        toast.success('Message sent successfully')
        setWasSubmitted(true)
      } else if (res.status === 400 || res.status === 401) {
        const dataObj = await res.json()
        toast.error(dataObj.message)
      } else {
        toast.error('Error sending form')
      }
    } catch (error) {
      console.log(error)
      toast.error('Error sending form')
    } finally {
      setName('')
      setEmail('')
      setPhone('')
      setMessage('')
    }
  }

  return (
    session && (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold mb-6">Contact Property Manager</h3>
        {!session ? (
          <p>You must be logged in to send a message</p>
        ) : wasSubmitted ? (
          <p className="text-green-500 mb-4">Your message has been sent successfully</p>
        ) : (
          <form onSubmit={handleSubmit} action={formAction}>
            <input type="hidden" id="property" name="property" defaultValue={property._id}></input>
            <input
              type="hidden"
              id="recipient"
              name="recipient"
              defaultValue={property.owner}></input>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                Name:
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="name"
                type="text"
                placeholder="Enter your name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                Email:
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                placeholder="Enter your email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
                Phone:
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="phone"
                type="text"
                placeholder="Enter your phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="body">
                Message:
              </label>
              <textarea
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 h-44 focus:outline-none focus:shadow-outline"
                id="body"
                placeholder="Enter your message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}></textarea>
            </div>
            <div>
              <SubmitMessageButton />
            </div>
          </form>
        )}
      </div>
    )
  )
}
export default PropertyContactForm

import connectDB from '@/config/database'
import Message from '@/models/Message'
import '@/models/Propery'
import { convertToSerializableObject } from '@/utils'
import { getSessionUser } from '@/utils/getSessionUser'

const MessagePage = async () => {
  connectDB()
  const sessionUser = await getSessionUser()

  const { userId } = sessionUser

  const readMessages = await Message.find({
    recipient: userId,
    read: true,
  })
    .sort({ createdAt: -1 })
    .populate('sender', 'username')
    .populate('propery', 'name')
    .lean()

  const unreadMessages = await Message.find({
    recipient: userId,
    read: false,
  })
    .sort({ createdAt: -1 })
    .populate('sender', 'username')
    .populate('propery', 'name')
    .lean()

  const messages = [...unreadMessages, ...readMessages].map((messageDoc) => {
    const message = convertToSerializableObject(messageDoc)
    messages.sender = convertToSerializableObject(messageDoc.sender)
    messages.propery = convertToSerializableObject(messageDoc.property)

    return message
  })

  return (
    <section className="bg-blue-50">
      <div className="container m-auto py-24 max-w-6xl">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <h1 className="text-3xl font-bold mb-4">Your Messages</h1>

          <div className="space-y-4">
            {messages.length === 0 ? (
              <p>Your have no messages</p>
            ) : (
              messages.map((message) => <h3 key={message._id}>{message.name}</h3>)
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default MessagePage

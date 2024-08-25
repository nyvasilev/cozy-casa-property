import Navbar from './components/NavBar'
import Footer from './components/Footer'
import { AuthProvider } from './components/AuthProvider'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import '@/src/styles/global.css'

export const metadata = {
  title: 'Cozy Casa Property | Find The Perfect Home',
  description:
    'Find the perfect home for you and your family. We have a wide range of properties to choose from. Contact us today to find your dream home.',
  keywords: 'property, home, real estate, cozy casa, cozy casa property',
}

const MainLayout = ({ children }) => {
  return (
    <AuthProvider>
      <html lang="en">
        <body>
          <Navbar />
          <div>{children}</div>
          <Footer />
          <ToastContainer />
        </body>
      </html>
    </AuthProvider>
  )
}

export default MainLayout

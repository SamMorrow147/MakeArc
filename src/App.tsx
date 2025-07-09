import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Suspense } from 'react'
import Navigation from './components/Navigation'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import './styles/globals.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <div>
        <Navigation />
        <Suspense fallback={
          <div style={{ 
            width: '100vw', 
            height: '100vh', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            backgroundColor: '#050505',
            color: '#00ffff',
            marginTop: '80px' // Account for navigation
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>Loading...</div>
            </div>
          </div>
        }>
          <HomePage />
        </Suspense>
      </div>
    )
  },
  {
    path: '/about',
    element: (
      <div>
        <Navigation />
        <div style={{ marginTop: '80px' }}> {/* Account for navigation */}
          <AboutPage />
        </div>
      </div>
    )
  }
])

export default function App() {
  return <RouterProvider router={router} />
} 
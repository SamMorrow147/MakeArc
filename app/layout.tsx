import React, { Suspense } from 'react'
import './globals.css'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Suspense fallback={
          <div style={{ 
            width: '100vw', 
            height: '100vh', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            backgroundColor: '#050505',
            color: '#00ffff'
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>Loading...</div>
            </div>
          </div>
        }>
          {children}
        </Suspense>
      </body>
    </html>
  )
} 
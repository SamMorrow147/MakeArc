import { Link, useLocation } from 'react-router-dom'

export default function Navigation() {
  const location = useLocation()

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 100,
      backgroundColor: 'rgba(5, 5, 5, 0.9)',
      backdropFilter: 'blur(10px)',
      borderBottom: '1px solid rgba(0, 255, 255, 0.3)',
      padding: '1rem 2rem'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <Link 
          to="/" 
          style={{
            color: '#00ffff',
            textDecoration: 'none',
            fontSize: '1.5rem',
            fontWeight: 'bold',
            fontFamily: 'monospace',
            textShadow: '0 0 10px #00ffff'
          }}
        >
          Make Architecture
        </Link>
        
        <div style={{
          display: 'flex',
          gap: '2rem'
        }}>
          <Link 
            to="/" 
            style={{
              color: location.pathname === '/' ? '#00ffff' : 'rgba(0, 255, 255, 0.7)',
              textDecoration: 'none',
              fontSize: '1rem',
              fontFamily: 'monospace',
              textShadow: location.pathname === '/' ? '0 0 10px #00ffff' : 'none',
              transition: 'all 0.3s ease'
            }}
          >
            Home
          </Link>
          <Link 
            to="/about" 
            style={{
              color: location.pathname === '/about' ? '#00ffff' : 'rgba(0, 255, 255, 0.7)',
              textDecoration: 'none',
              fontSize: '1rem',
              fontFamily: 'monospace',
              textShadow: location.pathname === '/about' ? '0 0 10px #00ffff' : 'none',
              transition: 'all 0.3s ease'
            }}
          >
            About
          </Link>
        </div>
      </div>
    </nav>
  )
} 
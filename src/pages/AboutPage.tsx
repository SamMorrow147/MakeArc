export default function AboutPage() {
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#050505',
      color: '#00ffff',
      fontFamily: 'monospace',
      padding: '2rem',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center'
    }}>
      <h1 style={{
        fontSize: '3rem',
        marginBottom: '2rem',
        fontWeight: 'bold',
        textShadow: '0 0 10px #00ffff'
      }}>
        About Make Architecture
      </h1>
      <div style={{
        maxWidth: '800px',
        fontSize: '1.2rem',
        lineHeight: '1.8',
        opacity: 0.9,
        textShadow: '0 0 5px #00ffff'
      }}>
        <p style={{ marginBottom: '1.5rem' }}>
          We are pioneers in architectural visualization, combining cutting-edge 3D technology 
          with timeless design principles to create stunning blueprint-style renderings.
        </p>
        <p style={{ marginBottom: '1.5rem' }}>
          Our team of architects, designers, and technologists work together to transform 
          your architectural concepts into immersive, interactive experiences that showcase 
          every detail with precision and elegance.
        </p>
        <p>
          From concept to completion, we bring your architectural visions to life with 
          our signature cyan wireframe aesthetic that pays homage to traditional blueprints 
          while embracing the future of digital design.
        </p>
      </div>
    </div>
  )
} 
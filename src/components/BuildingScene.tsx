import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, ScrollControls, useScroll } from '@react-three/drei'
import { useRef, useMemo, useState, useEffect } from 'react'
import * as THREE from 'three'

function Model({ shouldMoveUp }: { shouldMoveUp: boolean }) {
  const { scene } = useGLTF('/Images/modern_building_12.glb')
  const modelRef = useRef<THREE.Group>(null)
  const [startY, setStartY] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  
  // Create solid black material for opaque surfaces
  const solidMaterial = useMemo(() => {
    return new THREE.MeshBasicMaterial({
      color: 0x000000,
      transparent: true,
      opacity: 0.9,
      side: THREE.DoubleSide
    })
  }, [])
  
  // Create edge detection material for blueprint lines
  const edgeMaterial = useMemo(() => {
    return new THREE.LineBasicMaterial({ 
      color: 0x00ffff,
      transparent: true,
      opacity: 0.9,
      linewidth: 2
    })
  }, [])
  
  // Apply both solid surfaces and edge lines
  useMemo(() => {
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        // Create solid black version for opacity
        const solidMesh = new THREE.Mesh(child.geometry, solidMaterial)
        solidMesh.position.copy(child.position)
        solidMesh.rotation.copy(child.rotation)
        solidMesh.scale.copy(child.scale)
        
        // Create edges geometry for blueprint lines
        const edges = new THREE.EdgesGeometry(child.geometry, 30) // 30 degree threshold
        
        // Create line segments for the edges
        const edgeLines = new THREE.LineSegments(edges, edgeMaterial)
        edgeLines.position.copy(child.position)
        edgeLines.rotation.copy(child.rotation)
        edgeLines.scale.copy(child.scale)
        
        // Add both to parent
        if (child.parent) {
          child.parent.add(solidMesh)
          child.parent.add(edgeLines)
        }
        
        // Make original mesh invisible
        child.visible = false
      }
    })
  }, [scene, solidMaterial, edgeMaterial])

  // Handle vertical movement animation
  useEffect(() => {
    if (shouldMoveUp && !isAnimating && modelRef.current) {
      setIsAnimating(true)
      setStartY(modelRef.current.position.y)
    }
  }, [shouldMoveUp, isAnimating])

  // Animation frame for vertical movement
  useFrame((state, delta) => {
    if (isAnimating && modelRef.current) {
      const targetY = startY + 20 // Move up 20 units
      const currentY = modelRef.current.position.y
      const speed = 2 // Units per second
      
      if (currentY < targetY) {
        modelRef.current.position.y += speed * delta
      } else {
        setIsAnimating(false)
      }
    }
  })
  
  return <primitive ref={modelRef} object={scene} position={[35, 0, 0]} />
}

function CameraController({ onScrollComplete }: { onScrollComplete: () => void }) {
  const scroll = useScroll()
  const lastScrollOffset = useRef(0)
  const scrollCompleteTimeout = useRef<NodeJS.Timeout | null>(null)
  
  useFrame(({ camera }) => {
    // Start from a more straight down view (higher Y, looking straight down)
    const startY = 60  // Much higher for more straight down view
    const endY = 2     // Person's eye level
    const startX = 0
    const endX = 8     // Move to the side
    const startZ = 0
    const endZ = 15    // Move back to see the building
    
    // Interpolate camera position based on scroll
    const progress = Math.min(scroll.offset * 2, 1)
    
    camera.position.y = THREE.MathUtils.lerp(startY, endY, progress)
    camera.position.x = THREE.MathUtils.lerp(startX, endX, progress)
    camera.position.z = THREE.MathUtils.lerp(startZ, endZ, progress)
    
    // Always look at the building on the right side
    camera.lookAt(35, 5, 0) // Look at the building's center on the right

    // Check if scroll animation has completed
    if (Math.abs(scroll.offset - lastScrollOffset.current) < 0.001) {
      if (scrollCompleteTimeout.current) {
        clearTimeout(scrollCompleteTimeout.current)
      }
      scrollCompleteTimeout.current = setTimeout(() => {
        if (scroll.offset >= 0.99) { // Scroll is at the end
          onScrollComplete()
        }
      }, 500) // Wait 500ms to ensure scroll has truly stopped
    }
    
    lastScrollOffset.current = scroll.offset
  })
  
  return null
}

function Scene({ onScrollComplete }: { onScrollComplete: () => void }) {
  const [shouldMoveUp, setShouldMoveUp] = useState(false)

  const handleScrollComplete = () => {
    setShouldMoveUp(true)
    onScrollComplete()
  }

  return (
    <>
      {/* Dark background for blueprint feel */}
      <color attach="background" args={[0x050505]} />
      
      {/* Minimal lighting for clean visibility */}
      <ambientLight intensity={0.1} />
      
      {/* Camera controller */}
      <CameraController onScrollComplete={handleScrollComplete} />
      
      {/* Model */}
      <Model shouldMoveUp={shouldMoveUp} />
    </>
  )
}

export default function BuildingScene() {
  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
      {/* Text overlay on the left */}
      <div style={{
        position: 'absolute',
        top: '20%',
        left: '10%',
        zIndex: 10,
        color: '#00ffff',
        fontFamily: 'monospace',
        maxWidth: '400px'
      }}>
        <h1 style={{
          fontSize: '3rem',
          marginBottom: '1rem',
          fontWeight: 'bold',
          textShadow: '0 0 10px #00ffff'
        }}>
          Make Architecture
        </h1>
        <p style={{
          fontSize: '1.2rem',
          lineHeight: '1.6',
          opacity: 0.9,
          textShadow: '0 0 5px #00ffff'
        }}>
          Discover the future of architectural visualization. Our blueprint-style 3D models bring your designs to life with precision and elegance, showcasing every detail in stunning cyan wireframe glory.
        </p>
      </div>
      
      <div style={{
        position: 'absolute',
        right: '-400px',
        top: '-500px',
        width: '150vw',
        height: '150vh',
        transform: 'translateX(-100px) scale(1.5)'
      }}>
        <Canvas 
          camera={{ 
            position: [0, 60, 0], 
            fov: 60,
            near: 0.1,
            far: 1000
          }}
          gl={{ 
            antialias: true,
            alpha: false
          }}
        >
          <ScrollControls pages={3} damping={0.25}>
            <Scene onScrollComplete={() => console.log('Scroll animation completed!')} />
          </ScrollControls>
        </Canvas>
      </div>
    </div>
  )
} 
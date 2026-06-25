import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { STLLoader } from 'three/addons/loaders/STLLoader.js'

export default function JeepneyModel3D() {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (typeof window === 'undefined' || !canvasRef.current || !containerRef.current) return

    const container = containerRef.current
    const canvas = canvasRef.current

    let width = canvas.clientWidth
    let height = canvas.clientHeight

    // Scene
    const scene = new THREE.Scene()

    // Camera
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100)
    camera.position.set(0, 0, 8)

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.8)
    scene.add(ambientLight)

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 2.5)
    dirLight1.position.set(5, 10, 7)
    scene.add(dirLight1)

    const dirLight2 = new THREE.DirectionalLight(0xffffff, 1.5)
    dirLight2.position.set(-5, -10, -7)
    scene.add(dirLight2)

    const jeepneyGroup = new THREE.Group()
    scene.add(jeepneyGroup)

    let loadedMesh: THREE.Mesh | null = null
    let loadedGeom: THREE.BufferGeometry | null = null
    let loadedMat: THREE.MeshStandardMaterial | null = null

    // Load STL Model
    const loader = new STLLoader()
    loader.load('/Jeepney_Model.stl', (geometry) => {
      geometry.center()
      geometry.computeVertexNormals()

      // Calculate Bounding Box to scale the geometry into our target scene size
      geometry.computeBoundingBox()
      const boundingBox = geometry.boundingBox!
      const size = new THREE.Vector3()
      boundingBox.getSize(size)
      const maxDim = Math.max(size.x, size.y, size.z)
      const targetSize = 6.0
      const scale = targetSize / maxDim

      const material = new THREE.MeshStandardMaterial({
        vertexColors: true, // Enables VisCAM/Magics binary STL embedded colors!
        metalness: 0.1,
        roughness: 0.5,
        flatShading: true // highlights individual CAD polygons beautifully
      })

      const mesh = new THREE.Mesh(geometry, material)
      mesh.scale.set(scale, scale, scale)
      mesh.rotation.x = -Math.PI / 2 // Align Z-up CAD file with Y-up Three.js scene
      
      jeepneyGroup.add(mesh)
      loadedMesh = mesh
      loadedGeom = geometry
      loadedMat = material
      setIsLoading(false)
    }, undefined, (err) => {
      console.error('Failed to load Jeepney STL:', err)
      setIsLoading(false)
    })

    // Drag Interaction variables
    let isDragging = false
    let prevMouseX = 0
    let prevMouseY = 0
    let targetRotY = THREE.MathUtils.degToRad(180)
    let targetRotX = THREE.MathUtils.degToRad(0)

    const handleMouseDown = (e: MouseEvent) => {
      isDragging = true
      prevMouseX = e.clientX
      prevMouseY = e.clientY
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        const deltaX = e.clientX - prevMouseX
        const deltaY = e.clientY - prevMouseY
        targetRotY += deltaX * 0.007
        targetRotX += deltaY * 0.007
        prevMouseX = e.clientX
        prevMouseY = e.clientY
      }
    }

    const handleMouseUp = () => { isDragging = false }

    // Mobile Touch controls
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDragging = true
        prevMouseX = e.touches[0].clientX
        prevMouseY = e.touches[0].clientY
      }
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (isDragging && e.touches.length === 1) {
        const deltaX = e.touches[0].clientX - prevMouseX
        const deltaY = e.touches[0].clientY - prevMouseY
        targetRotY += deltaX * 0.008
        targetRotX += deltaY * 0.008
        prevMouseX = e.touches[0].clientX
        prevMouseY = e.touches[0].clientY
      }
    }

    const handleTouchEnd = () => { isDragging = false }

    container.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)
    container.addEventListener('touchstart', handleTouchStart, { passive: true })
    window.addEventListener('touchmove', handleTouchMove, { passive: true })
    window.addEventListener('touchend', handleTouchEnd)

    // Resize Canvas Listener
    const resizeObserver = new ResizeObserver(() => {
      width = canvas.clientWidth
      height = canvas.clientHeight
      if (width === 0 || height === 0) return
      camera.aspect = width / height
      
      // Adjust camera distance based on width to prevent layout overflow on mobile
      if (window.innerWidth < 640) {
        camera.position.z = 9.5 // Push back on mobile
      } else {
        camera.position.z = 8.0
      }
      
      camera.updateProjectionMatrix()
      renderer.setSize(width, height, false)
    })
    resizeObserver.observe(canvas)

    // Animation Loop
    let animationFrameId: number
    const clock = new THREE.Clock()

    const animate = () => {
      const t = clock.getElapsedTime()
      
      if (!isDragging) {
        // Slow continuous idle rotation
        targetRotY += 0.0025
        jeepneyGroup.position.y = Math.sin(t * 1.2) * 0.08 // Float float effect
      }

      jeepneyGroup.rotation.x += (targetRotX - jeepneyGroup.rotation.x) * 0.1
      jeepneyGroup.rotation.y += (targetRotY - jeepneyGroup.rotation.y) * 0.1

      renderer.render(scene, camera)
      animationFrameId = requestAnimationFrame(animate)
    }
    animate()

    // Cleanup resources
    return () => {
      cancelAnimationFrame(animationFrameId)
      resizeObserver.disconnect()
      container.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
      container.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('touchend', handleTouchEnd)

      if (loadedMesh) {
        loadedGeom?.dispose()
        loadedMat?.dispose()
      }
      renderer.dispose()
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[240px] sm:h-[360px] md:h-[480px] cursor-grab active:cursor-grabbing select-none"
      style={{ overflow: 'visible' }}
    >
      <canvas ref={canvasRef} className="absolute block inset-0 w-full h-full" />
      {isLoading && (
        <div className="absolute inset-0 bg-[#0f081b]/90 flex items-center justify-center">
          <div className="flex flex-col items-center gap-2">
            <span className="w-8 h-8 border-2 border-[var(--color-gold)] border-t-transparent rounded-full animate-spin"></span>
            <span className="text-[var(--color-muted)] text-xs uppercase tracking-widest font-mono">Parsing CAD Model...</span>
          </div>
        </div>
      )}
    </div>
  )
}

import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'

interface TabletModel3DProps {
  textureUrl: string
}

// Helper: create a rounded rectangle Shape
function createRoundedRectShape(w: number, h: number, r: number): THREE.Shape {
  const shape = new THREE.Shape()
  const x = -w / 2
  const y = -h / 2
  shape.moveTo(x + r, y)
  shape.lineTo(x + w - r, y)
  shape.quadraticCurveTo(x + w, y, x + w, y + r)
  shape.lineTo(x + w, y + h - r)
  shape.quadraticCurveTo(x + w, y + h, x + w - r, y + h)
  shape.lineTo(x + r, y + h)
  shape.quadraticCurveTo(x, y + h, x, y + h - r)
  shape.lineTo(x, y + r)
  shape.quadraticCurveTo(x, y, x + r, y)
  return shape
}

export default function TabletModel3D({ textureUrl }: TabletModel3DProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (typeof window === 'undefined' || !canvasRef.current || !containerRef.current) return

    const container = containerRef.current
    const canvas = canvasRef.current

    // Canvas is oversized (extends beyond container) to prevent clipping on rotation
    let width = canvas.clientWidth
    let height = canvas.clientHeight

    // Scene
    const scene = new THREE.Scene()

    // Camera
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100)
    camera.position.set(0, 0, 4.5)

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    // Group
    const tabletGroup = new THREE.Group()
    scene.add(tabletGroup)

    // Subtle tilt
    const initialRotX = THREE.MathUtils.degToRad(3)
    const initialRotY = THREE.MathUtils.degToRad(-8)
    const initialRotZ = THREE.MathUtils.degToRad(1.5)
    tabletGroup.rotation.set(initialRotX, initialRotY, initialRotZ)

    // Texture
    const textureLoader = new THREE.TextureLoader()
    const screenTexture = textureLoader.load(textureUrl, () => {
      setIsLoading(false)
    })
    screenTexture.colorSpace = THREE.SRGBColorSpace

    // Dimensions (Landscape Tablet)
    const tabletW = 4.4
    const tabletH = 2.8
    const tabletD = 0.12
    const bodyRadius = 0.25

    // --- Tablet Body (extruded rounded rect) ---
    const bodyShape = createRoundedRectShape(tabletW, tabletH, bodyRadius)
    const bodyGeom = new THREE.ExtrudeGeometry(bodyShape, {
      steps: 1,
      depth: tabletD,
      bevelEnabled: true,
      bevelThickness: 0.04,
      bevelSize: 0.02,
      bevelSegments: 4,
      curveSegments: 16
    })
    bodyGeom.center()

    const casingMat = new THREE.MeshStandardMaterial({
      color: 0x1a1226,
      metalness: 0.85,
      roughness: 0.3,
    })
    const tabletBody = new THREE.Mesh(bodyGeom, casingMat)
    tabletGroup.add(tabletBody)

    // --- Screen (rounded ShapeGeometry matching body corners) ---
    const bezel = 0.14
    const screenW = tabletW - bezel
    const screenH = tabletH - bezel
    const screenRadius = bodyRadius - bezel / 2

    const screenShape = createRoundedRectShape(screenW, screenH, screenRadius)
    const screenGeom = new THREE.ShapeGeometry(screenShape, 16)

    // Compute UVs manually so texture maps correctly to the rounded shape
    const pos = screenGeom.attributes.position
    const uvAttr = screenGeom.attributes.uv
    for (let i = 0; i < pos.count; i++) {
      const px = pos.getX(i)
      const py = pos.getY(i)
      uvAttr.setXY(i, (px + screenW / 2) / screenW, (py + screenH / 2) / screenH)
    }
    uvAttr.needsUpdate = true

    const screenMat = new THREE.MeshBasicMaterial({
      map: screenTexture,
    })

    const screenMesh = new THREE.Mesh(screenGeom, screenMat)
    screenMesh.position.z = tabletD / 2 + 0.045
    tabletGroup.add(screenMesh)

    // Camera notch detail
    const camGeom = new THREE.CircleGeometry(0.025, 16)
    const camMat = new THREE.MeshBasicMaterial({ color: 0x020104 })
    const camMesh = new THREE.Mesh(camGeom, camMat)
    camMesh.position.set(0, tabletH / 2 - 0.05, tabletD / 2 + 0.046)
    tabletGroup.add(camMesh)

    // --- Lighting (ambient only + soft directional, NO point lights) ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2)
    scene.add(ambientLight)

    const dirLight = new THREE.DirectionalLight(0xffffff, 0.6)
    dirLight.position.set(-3, 4, 5)
    scene.add(dirLight)

    // Interaction
    let isDragging = false
    let prevMouseX = 0
    let prevMouseY = 0
    let targetRotX = initialRotX
    let targetRotY = initialRotY

    // Clamp rotation so the back is never visible (~60° max from center)
    const maxRot = THREE.MathUtils.degToRad(60)
    const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v))

    const handleMouseDown = (e: MouseEvent) => {
      isDragging = true
      prevMouseX = e.clientX
      prevMouseY = e.clientY
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        const deltaX = e.clientX - prevMouseX
        const deltaY = e.clientY - prevMouseY
        targetRotY = clamp(targetRotY + deltaX * 0.007, -maxRot, maxRot)
        targetRotX = clamp(targetRotX + deltaY * 0.007, -maxRot, maxRot)
        prevMouseX = e.clientX
        prevMouseY = e.clientY
      } else {
        const rect = container.getBoundingClientRect()
        const x = (e.clientX - rect.left) / rect.width - 0.5
        const y = (e.clientY - rect.top) / rect.height - 0.5
        targetRotY = clamp(initialRotY + x * 0.4, -maxRot, maxRot)
        targetRotX = clamp(initialRotX + y * 0.4, -maxRot, maxRot)
      }
    }

    const handleMouseUp = () => { isDragging = false }

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
        targetRotY = clamp(targetRotY + deltaX * 0.008, -maxRot, maxRot)
        targetRotX = clamp(targetRotX + deltaY * 0.008, -maxRot, maxRot)
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

    // Resize — observe the canvas element (which is oversized)
    const resizeObserver = new ResizeObserver(() => {
      width = canvas.clientWidth
      height = canvas.clientHeight
      if (width === 0 || height === 0) return
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height, false)
    })
    resizeObserver.observe(canvas)

    // Animation
    let animationFrameId: number
    const clock = new THREE.Clock()

    const animate = () => {
      const t = clock.getElapsedTime()
      let idleX = 0, idleY = 0, idlePos = 0
      if (!isDragging) {
        idleX = Math.cos(t * 0.7) * 0.02
        idleY = Math.sin(t * 0.5) * 0.03
        idlePos = Math.cos(t * 1.3) * 0.05
      }
      tabletGroup.rotation.x += (targetRotX + idleX - tabletGroup.rotation.x) * 0.1
      tabletGroup.rotation.y += (targetRotY + idleY - tabletGroup.rotation.y) * 0.1
      tabletGroup.position.y += (idlePos - tabletGroup.position.y) * 0.05
      renderer.render(scene, camera)
      animationFrameId = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      cancelAnimationFrame(animationFrameId)
      resizeObserver.disconnect()
      container.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
      container.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('touchend', handleTouchEnd)

      bodyGeom.dispose()
      screenGeom.dispose()
      camGeom.dispose()
      casingMat.dispose()
      screenMat.dispose()
      camMat.dispose()
      screenTexture.dispose()
      renderer.dispose()
    }
  }, [textureUrl])

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full cursor-grab active:cursor-grabbing select-none"
      style={{ overflow: 'visible' }}
    >
      {/* Canvas extends beyond container to prevent clipping on rotation */}
      <canvas
        ref={canvasRef}
        className="absolute block"
        style={{ inset: '-100px', width: 'calc(100% + 200px)', height: 'calc(100% + 200px)' }}
      />
      {isLoading && (
        <div className="absolute inset-0 bg-[#0f081b] flex items-center justify-center rounded-2xl border-[6px] border-[var(--color-surface)]">
          <div className="flex flex-col items-center gap-2">
            <span className="w-6 h-6 border-2 border-[var(--color-gold)] border-t-transparent rounded-full animate-spin"></span>
            <span className="text-[var(--color-muted)] text-[10px] uppercase tracking-wider font-mono">Loading 3D...</span>
          </div>
        </div>
      )}
    </div>
  )
}

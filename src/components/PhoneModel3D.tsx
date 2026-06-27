import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'

interface PhoneModel3DProps {
  textureUrl: string
  cameraZ?: number
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

export default function PhoneModel3D({ textureUrl, cameraZ }: PhoneModel3DProps) {
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
    camera.position.set(0, 0, cameraZ || 7.5)

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
    const phoneGroup = new THREE.Group()
    scene.add(phoneGroup)

    // Subtle tilt
    const initialRotX = THREE.MathUtils.degToRad(3)
    const initialRotY = THREE.MathUtils.degToRad(8)
    const initialRotZ = THREE.MathUtils.degToRad(-1.5)
    phoneGroup.rotation.set(initialRotX, initialRotY, initialRotZ)

    // Texture
    const textureLoader = new THREE.TextureLoader()
    const screenTexture = textureLoader.load(textureUrl, () => {
      setIsLoading(false)
    })
    screenTexture.colorSpace = THREE.SRGBColorSpace

    // Dimensions
    const phoneW = 2.4
    const phoneH = 4.8
    const phoneD = 0.15
    const bodyRadius = 0.35

    // --- Phone Body (extruded rounded rect) ---
    const bodyShape = createRoundedRectShape(phoneW, phoneH, bodyRadius)
    const bodyGeom = new THREE.ExtrudeGeometry(bodyShape, {
      steps: 1,
      depth: phoneD,
      bevelEnabled: true,
      bevelThickness: 0.05,
      bevelSize: 0.03,
      bevelSegments: 4,
      curveSegments: 16
    })
    bodyGeom.center()

    const casingMat = new THREE.MeshStandardMaterial({
      color: 0x160d24,
      metalness: 0.9,
      roughness: 0.25,
    })
    const phoneBody = new THREE.Mesh(bodyGeom, casingMat)
    phoneGroup.add(phoneBody)

    // --- Screen (rounded ShapeGeometry matching body corners) ---
    const bezel = 0.08
    const screenW = phoneW - bezel
    const screenH = phoneH - bezel
    const screenRadius = bodyRadius - bezel / 2

    const screenShape = createRoundedRectShape(screenW, screenH, screenRadius)
    const screenGeom = new THREE.ShapeGeometry(screenShape, 16)

    // Compute UVs manually so the texture maps correctly to the rounded shape
    const pos = screenGeom.attributes.position
    const uvAttr = screenGeom.attributes.uv
    for (let i = 0; i < pos.count; i++) {
      const px = pos.getX(i)
      const py = pos.getY(i)
      // Map position to 0..1 UV range
      uvAttr.setXY(i, (px + screenW / 2) / screenW, (py + screenH / 2) / screenH)
    }
    uvAttr.needsUpdate = true

    const screenMat = new THREE.MeshBasicMaterial({
      map: screenTexture,
    })

    const screenMesh = new THREE.Mesh(screenGeom, screenMat)
    screenMesh.position.z = phoneD / 2 + 0.055
    phoneGroup.add(screenMesh)

    // Speaker grill
    const grillGeom = new THREE.BoxGeometry(0.5, 0.03, 0.01)
    const grillMat = new THREE.MeshBasicMaterial({ color: 0x050308 })
    const grill = new THREE.Mesh(grillGeom, grillMat)
    grill.position.set(0, phoneH / 2 - 0.12, phoneD / 2 + 0.056)
    phoneGroup.add(grill)

    // --- Lighting (ambient only + soft directional, NO point lights) ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2)
    scene.add(ambientLight)

    const dirLight = new THREE.DirectionalLight(0xffffff, 0.6)
    dirLight.position.set(3, 4, 5)
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
      
      // Adjust camera distance based on width to prevent layout overflow on mobile
      if (window.innerWidth < 640) {
        const scaleFactor = (cameraZ || 7.5) / 7.5
        camera.position.z = 9.2 * scaleFactor
      } else {
        camera.position.z = cameraZ || 7.5
      }
      
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
        idleX = Math.sin(t * 0.8) * 0.03
        idleY = Math.cos(t * 0.6) * 0.04
        idlePos = Math.sin(t * 1.5) * 0.06
      }
      phoneGroup.rotation.x += (targetRotX + idleX - phoneGroup.rotation.x) * 0.1
      phoneGroup.rotation.y += (targetRotY + idleY - phoneGroup.rotation.y) * 0.1
      phoneGroup.position.y += (idlePos - phoneGroup.position.y) * 0.05
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
      grillGeom.dispose()
      casingMat.dispose()
      screenMat.dispose()
      grillMat.dispose()
      screenTexture.dispose()
      renderer.dispose()
    }
  }, [textureUrl, cameraZ])

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
        style={{ inset: '-60px', width: 'calc(100% + 120px)', height: 'calc(100% + 120px)' }}
      />
      {isLoading && (
        <div className="absolute inset-0 bg-[#0f081b] flex items-center justify-center rounded-[2.5rem] border-[6px] border-[var(--color-surface)]">
          <div className="flex flex-col items-center gap-2">
            <span className="w-6 h-6 border-2 border-[var(--color-gold)] border-t-transparent rounded-full animate-spin"></span>
            <span className="text-[var(--color-muted)] text-[10px] uppercase tracking-wider font-mono">Loading 3D...</span>
          </div>
        </div>
      )}
    </div>
  )
}

'use client'
import { useEffect } from 'react'

export default function Page() {
  useEffect(() => {
    // --- Load Three.js dari public folder ---
    const script = document.createElement('script')
    script.src = '/three.min.js'
    script.onload = () => {
      const THREE = (window as any).THREE

      const scene = new THREE.Scene()
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
      renderer.setSize(window.innerWidth, window.innerHeight)
      document.body.appendChild(renderer.domElement)

      // --- Lights ---
      scene.add(new THREE.AmbientLight(0x404040, 2))
      const pointLight1 = new THREE.PointLight(0xff00ff, 2, 200)
      pointLight1.position.set(20, 30, 20)
      scene.add(pointLight1)
      const pointLight2 = new THREE.PointLight(0xff9900, 2, 200)
      pointLight2.position.set(-30, 40, -10)
      scene.add(pointLight2)

      // --- Low-poly plane ---
      const geometry = new THREE.PlaneGeometry(100, 100, 50, 50)
      geometry.rotateX(-Math.PI / 2)
      const posAttr = geometry.attributes.position
      for (let i = 0; i < posAttr.count; i++) posAttr.setZ(i, posAttr.getZ(i) + (Math.random() - 0.5) * 2)
      const colors: number[] = []
      for (let i = 0; i < posAttr.count; i++) {
        const color = new THREE.Color()
        color.setHSL(Math.random(), 1, 0.5)
        colors.push(color.r, color.g, color.b)
      }
      geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3))
      const material = new THREE.MeshPhongMaterial({ vertexColors: true, flatShading: true, side: THREE.DoubleSide })
      const mesh = new THREE.Mesh(geometry, material)
      scene.add(mesh)

      // --- Floating geometries ---
      const floating: THREE.Mesh[] = []
      const shapes = [new THREE.BoxGeometry(2, 2, 2), new THREE.TetrahedronGeometry(2), new THREE.OctahedronGeometry(2)]
      for (let i = 0; i < 20; i++) {
        const geo = shapes[Math.floor(Math.random() * shapes.length)]
        const mat = new THREE.MeshPhongMaterial({ color: new THREE.Color(Math.random(), Math.random(), Math.random()), flatShading: true })
        const obj = new THREE.Mesh(geo, mat)
        obj.position.set((Math.random() - 0.5) * 80, Math.random() * 20 + 5, (Math.random() - 0.5) * 80)
        obj.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI)
        scene.add(obj)
        floating.push(obj)
      }

      // --- Camera controls ---
      let angle = 0, targetX = 0, targetY = 0, zoomOffset = 0
      window.addEventListener('mousemove', e => {
        targetX = (e.clientX / window.innerWidth - 0.5) * 10
        targetY = (e.clientY / window.innerHeight - 0.5) * 5
      })
      window.addEventListener('wheel', e => {
        zoomOffset += e.deltaY * 0.05
        zoomOffset = Math.min(Math.max(zoomOffset, -15), 15)
      })

      const neonColors = [0x00ffff, 0xff00ff, 0xff9900]
      let colorIndex = 0, nextColorIndex = 1, colorMix = 0

      const animate = () => {
        requestAnimationFrame(animate)
        const time = Date.now() * 0.001

        for (let i = 0; i < posAttr.count; i++) {
          posAttr.setZ(i, Math.sin(i / 5 + time) * 1.5)
          const c1 = new THREE.Color(neonColors[colorIndex])
          const c2 = new THREE.Color(neonColors[nextColorIndex])
          const curColor = c1.clone().lerp(c2, colorMix)
          geometry.attributes.color.setXYZ(i, curColor.r, curColor.g, curColor.b)
        }
        posAttr.needsUpdate = true
        geometry.attributes.color.needsUpdate = true

        floating.forEach(obj => {
          obj.rotation.x += 0.001
          obj.rotation.y += 0.002
        })

        colorMix += 0.002
        if (colorMix >= 1) {
          colorMix = 0
          colorIndex = nextColorIndex
          nextColorIndex = (nextColorIndex + 1) % neonColors.length
        }

        angle += 0.0008
        const baseZoom = 40 + Math.sin(time * 0.5) * 5 + zoomOffset
        camera.position.x = Math.sin(angle) * baseZoom + targetX
        camera.position.z = Math.cos(angle) * baseZoom
        camera.position.y = 20 + Math.sin(time * 0.3) * 2 + targetY
        camera.lookAt(0, 0, 0)

        renderer.render(scene, camera)
      }
      animate()
    }
    document.body.appendChild(script)
  }, [])

  return (
    <>
      <header style={{position: 'fixed', top:0, left:0, width:'100%', display:'flex', justifyContent:'space-between', padding:'1rem', color:'white', zIndex:10}}>
        <div style={{fontSize:'1.5rem', fontWeight:'bold'}}>DSRT</div>
        <button style={{padding:'0.5rem 1.5rem', borderRadius:'12px', fontWeight:'bold', background:'linear-gradient(90deg, #8000ff, #00ffee, #ff9900)', color:'white'}}>Login</button>
      </header>
      <main style={{position:'fixed', top:'50%', left:'50%', transform:'translate(-50%,-50%)', textAlign:'center', color:'white', zIndex:10}}>
        <h1 style={{fontSize:'4rem', fontWeight:'bold', background:'linear-gradient(90deg, #00ffee, #ff00ff, #ff9900)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent'}}>
          Welcome to DSRT
        </h1>
      </main>
    </>
  )
}

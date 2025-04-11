import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef, useState, forwardRef, useImperativeHandle, useEffect } from 'react'
import * as THREE from 'three'
import { Noise } from 'noisejs'
import useKeyboard from '/src/hooks/useKeyboard'
import { clamp } from 'three/src/math/MathUtils.js'

const noise = new Noise(Math.random())

const UFO = forwardRef((
  { 
    position,
    occAmount = 0.5, 
    occSpeed = 3, 
    moveSpeed = 0.1, 
    spinningSpeed = 0.02,
    noiseValue = 0,
    bounds = { min: new THREE.Vector3(-50, -50, -50), max: new THREE.Vector3(50, 50, 50) }
  }, 
  ref
) => {
  const group = useRef()
  const { scene: ufo, nodes: ufoParts } = useGLTF('/src/assets/Portfolio.glb')
  const keys = useKeyboard()

  const [fireNoiseValue, setFireNoiseValue] = useState(0)
  const velocity = useRef(new THREE.Vector3())

  useImperativeHandle(ref, () => ({
    get position() {
      return group.current?.position
    },
    get current() {
      return group.current
    }
  }), [])

  useEffect(() => {
    if (group.current && position) {
      group.current.position.set(...position)
    }
  }, [position])

  useFrame((state, delta) => {
    if (!group.current) return

    const model = group.current
    const time = state.clock.getElapsedTime()

    const animHeight = occAmount * Math.sin(time * occSpeed)
    const noiseHeight = noise.perlin2(model.position.x * 0.01, model.position.z * 0.01) * noiseValue
    model.position.y = position[1] + animHeight + noiseHeight

    const v = velocity.current
    if (keys['KeyW'] || keys['ArrowUp']) v.z = Math.max(-moveSpeed, v.z - 0.01)
    if (keys['KeyS'] || keys['ArrowDown']) v.z = Math.min(moveSpeed, v.z + 0.01)
    if (keys['KeyA'] || keys['ArrowLeft']) v.x = Math.max(-moveSpeed, v.x - 0.01)
    if (keys['KeyD'] || keys['ArrowRight']) v.x = Math.min(moveSpeed, v.x + 0.01)

    model.position.set(
      clamp(model.position.x + v.x, bounds.min.x, bounds.max.x),
      clamp(model.position.y + v.y, bounds.min.y, bounds.max.y),
      clamp(model.position.z + v.z, bounds.min.z, bounds.max.z)
    )

    model.rotation.x = mapRange(v.z, -moveSpeed, moveSpeed, -Math.PI / 6, Math.PI / 6)
    model.rotation.z = mapRange(v.x, -moveSpeed, moveSpeed, Math.PI / 6, -Math.PI / 6)

    if (ufoParts.UFOBody) ufoParts.UFOBody.rotation.y += spinningSpeed
    if (ufoParts.UFOLights) ufoParts.UFOLights.rotation.y -= spinningSpeed

    if (ufoParts.UFOFire) {
      const scale = noise.simplex2(fireNoiseValue, 2) * 0.2 + 1.2
      ufoParts.UFOFire.scale.y = scale
    }

    setFireNoiseValue((v) => v + delta * 10000)
    velocity.current.multiplyScalar(1 - 0.05)
  })

  return (
    <group ref={group} position={position}>
      <primitive object={ufo} />
    </group>
  )
})

export default UFO

function mapRange(value, inMin, inMax, outMin, outMax) {
  return outMin + ((value - inMin) * (outMax - outMin)) / (inMax - inMin)
}
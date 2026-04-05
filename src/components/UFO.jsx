import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef, useState, forwardRef, useImperativeHandle, useEffect } from 'react'
import * as THREE from 'three'
import { Noise } from 'noisejs'
import useKeyboard from '/src/hooks/useKeyboard'
import { clamp } from 'three/src/math/MathUtils.js'
import usePlayerController from '@/hooks/UFO/usePlayerController'
import useBobbingAnimation from '@/hooks/UFO/useBobbingAnimation'

const noise = new Noise(Math.random())

const UFO = forwardRef((
  { 
    position,
    bobAmount = 0.5, 
    bobSpeed = 3, 
    moveSpeed = 0.2, 
    spinningSpeed = 0.02,
    terrain = (position, time) => new THREE.Vector3(),
    bounds = { min: new THREE.Vector3(-50, -50, -50), max: new THREE.Vector3(50, 50, 50) }
  }, 
  ref
) => {
  const group = useRef()
  const { scene: ufo, nodes: ufoParts } = useGLTF('/src/assets/Portfolio.glb')

  const fireNoiseValue = useRef(0)
  const velocity = useRef(new THREE.Vector3())

  const motion = useRef({
    basePosition: new THREE.Vector3(),
    bobbing: new THREE.Vector3(),
    velocity: new THREE.Vector3()
  })

  useImperativeHandle(ref, () => ({
    get position() {
      return group.current?.position
    },
    get current() {
      return group.current
    }
  }), [])

  usePlayerController(motion, moveSpeed, bounds)
  useBobbingAnimation(motion, bobAmount, bobSpeed)

  useFrame((state, delta) => {
    if (!group.current) return
    const time = state.clock.getElapsedTime()

    const model = group.current

    model.rotation.x = mapRange(motion.current.velocity.z, -moveSpeed, moveSpeed, -Math.PI / 6, Math.PI / 6)
    model.rotation.z = mapRange(motion.current.velocity.x, -moveSpeed, moveSpeed, Math.PI / 6, -Math.PI / 6)

    if (ufoParts.UFOBody) ufoParts.UFOBody.rotation.y += spinningSpeed
    if (ufoParts.UFOLights) ufoParts.UFOLights.rotation.y -= spinningSpeed

    if (ufoParts.UFOFire) {
      const scale = noise.simplex2(time * 10000, 2) * 0.2 + 1.2
      ufoParts.UFOFire.scale.y = scale
    }

    motion.current.velocity.multiplyScalar(1 - 0.05)

    model.position.copy(motion.current.basePosition)
    model.position.add(motion.current.bobbing)

    const offset = terrain(motion.current.basePosition, time)
    model.position.add(offset)
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
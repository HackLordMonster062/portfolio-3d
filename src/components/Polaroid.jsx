import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef, useState, forwardRef, useImperativeHandle, useEffect } from 'react'

const Polaroid = forwardRef((
  { 
    position,
    scale,
    spinningSpeed = 0.03
  }, 
  ref
) => {
  const group = useRef()
  const { scene: polaroid, nodes: polaroidParts } = useGLTF('/src/assets/Polaroid.glb')

  useFrame((state, delta) => {
    if (polaroidParts.Colors) polaroidParts.Colors.rotation.x += spinningSpeed
  })

  return (
    <group ref={group} position={position} scale={scale}>
      <primitive object={polaroid} />
    </group>
  )
})

export default Polaroid
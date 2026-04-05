import { useGLTF } from '@react-three/drei'
import { useFrame, useGraph } from '@react-three/fiber'
import { useRef, useState, forwardRef, useImperativeHandle, useEffect, useMemo } from 'react'

const Polaroid = forwardRef((
  { 
    spinningSpeed = 0.03,
    position,
    ...props
  }, 
  ref
) => {
  const group = useRef()
  const { scene } = useGLTF('/src/assets/Polaroid.glb')

  const clone = useMemo(() => scene.clone(true), [scene])
  const { nodes } = useGraph(clone)

  useFrame((state, delta) => {
    if (nodes.Colors) nodes.Colors.rotation.x += spinningSpeed
  })

  return (
    <group ref={group} position={position} {...props}>
      <primitive object={clone} position={[0, 0, 0]} />
    </group>
  )
})

export default Polaroid
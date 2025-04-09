import { useThree, useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'

export const cameraState = {
  offset: new THREE.Vector3(0, 10, 20),
  target: new THREE.Vector3(0, 0, 0),
  targetView: new THREE.Vector3(0, 0, 0)
}

export default function FollowCamera({ speed = 0.05 }) {
  const { camera } = useThree()

  useFrame(() => {
    const desiredPos = cameraState.target.clone().add(cameraState.offset)
    camera.position.lerp(desiredPos, speed)

    camera.lookAt(cameraState.targetView)
  })

  return null
}
import { useThree, useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'

export const cameraState = {
  offset: new THREE.Vector3(0, 8, 20),
  target: new THREE.Vector3(0, 0, 0),
  targetView: new THREE.Vector3(0, 0, 0)
}

export default function FollowCamera({ speed = 0.6, rotationSpeed = .05 }) {
  const { camera } = useThree()
  const targetView = useRef(cameraState.targetView.clone())

  useFrame(() => {
    const desiredPos = cameraState.target.clone().add(cameraState.offset)
    camera.position.lerp(desiredPos, speed)

    targetView.current.lerp(cameraState.targetView, rotationSpeed)
    camera.lookAt(targetView.current)
  })

  return null
}
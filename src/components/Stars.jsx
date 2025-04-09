import * as THREE from 'three'
import { useMemo } from 'react'

export default function Stars({ count = 300, maxDistance = 500 }) {
  const positions = useMemo(() => {
    return new Array(count).fill().map(() => [
      THREE.MathUtils.randFloatSpread(maxDistance),
      THREE.MathUtils.randFloatSpread(maxDistance),
      THREE.MathUtils.randFloatSpread(maxDistance),
    ])
  }, [count, maxDistance])

  return (
    <>
      {positions.map(([x, y, z], i) => (
        <mesh key={i} position={[x, y, z]}>
          <sphereGeometry args={[0.25, 4, 4]} />
          <meshStandardMaterial color="white" emissive="white" emissiveIntensity={1.5} />
        </mesh>
      ))}
    </>
  )
}
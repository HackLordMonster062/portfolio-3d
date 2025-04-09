import { useState } from "react"

export default function Planet({ 
    position = [0, 0, 0], 
    radius = 1, 
    hoverGrowth = 1.05,
    materialProps = { color: "orange" }, 
    onClick 
}) {
    const [hovered, setHovered] = useState(false)
  
    return (
      <mesh
        position={position}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={onClick}
      >
        <sphereGeometry args={[hovered ? radius * hoverGrowth : radius, 32, 32]} />
        <meshStandardMaterial {...materialProps} />
      </mesh>
    )
  }
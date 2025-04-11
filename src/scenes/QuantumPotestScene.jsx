import FollowCamera, { cameraState } from "@/components/FollowCamera"
import { useFrame } from "@react-three/fiber"
import { useRef } from "react"
import UFO from "@/components/UFO"
import { Environment } from "@react-three/drei"

export default function QuantumPotestScene() {
    const ufoRef = useRef()

    useFrame(() => {
        if (ufoRef.current) {
            cameraState.target.copy(ufoRef.current.position)
            cameraState.targetView.copy(ufoRef.current.position).y = 2
        }
    })

    return (
        <>
            <UFO ref={ufoRef} position={[0, 2, 0]} />
            <FollowCamera />

            <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <planeGeometry args={[50, 50]} />
                <meshStandardMaterial color='orange' />
            </mesh>
                            
            <ambientLight intensity={0.3} />
            <directionalLight position={[5, 10, 7]} intensity={1} />

            <Environment preset="sunset" />
        </>
    )
}
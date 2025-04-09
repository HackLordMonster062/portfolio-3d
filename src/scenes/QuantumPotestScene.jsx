import FollowCamera, { cameraState } from "@/components/FollowCamera"
import { useFrame } from "@react-three/fiber"
import { useRef } from "react"
import UFO from "@/components/UFO"
import { Environment } from "@react-three/drei"
import { Vector3 } from "three"

export default function QuantumPotestScene() {
    const ufoRef = useRef()

    useFrame(() => {
        if (ufoRef.current) {
            cameraState.target.copy(ufoRef.current.position)
        }
    })

    return (
        <>
            <UFO ref={ufoRef} />
            <FollowCamera />
                            
            <ambientLight intensity={0.3} />
            <directionalLight position={[5, 10, 7]} intensity={1} />

            <Environment preset="sunset" />
        </>
    )
}
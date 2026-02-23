import FollowCamera, { cameraState } from "@/components/FollowCamera"
import { useFrame } from "@react-three/fiber"
import { useRef } from "react"
import UFO from "@/components/UFO"
import { Environment, useGLTF } from "@react-three/drei"
import { Vector3 } from "three"

export default function GameDevScene() {
    const ufoRef = useRef()
    const { scene: village, nodes: villageParts } = useGLTF('/src/assets/Village.glb')
    const { scene: polaroid, nodes: polaroidParts } = useGLTF('/src/assets/Polaroid.glb')

    useFrame(() => {
        if (ufoRef.current) {
            cameraState.target.copy(ufoRef.current.position)
            cameraState.targetView.copy(ufoRef.current.position).y = 2
        }
    })

    return (
        <>
            <UFO 
                ref={ufoRef} 
                position={[0, 8, 0]}
                moveSpeed={.2}
                bounds={{
                    min: new Vector3(-250, -250, -250), 
                    max: new Vector3(250, 250, 250)
                }} />
            <FollowCamera />

            <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <planeGeometry args={[500, 500]} />
                <meshStandardMaterial color='orange' />
            </mesh>

            <group ref={useRef()} position={[-50, .01, 0]} scale={[.5, .5, .5]}>
                <primitive object={village} />
            </group>

            <group ref={useRef()} position={[30, 0, 0]}>
                <primitive object={polaroid} />
            </group>
                            
            <ambientLight intensity={0.3} />
            <directionalLight position={[5, 10, 7]} intensity={1} />

            <Environment preset="sunset" />
        </>
    )
}
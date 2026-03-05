import FollowCamera, { cameraState } from "@/components/FollowCamera"
import { useFrame } from "@react-three/fiber"
import { useRef } from "react"
import UFO from "@/components/UFO"
import { Environment, useGLTF } from "@react-three/drei"
import { Euler, Vector3 } from "three"
import Polaroid from "@/components/Polaroid"
import BlueRobot from "@/components/BlueRobot"

export default function GameDevScene() {
    const ufoRef = useRef()
    
    const robotRef = useRef()
    const polaroidRef = useRef()
    const { scene: village, nodes: villageParts } = useGLTF('/src/assets/Village.glb')
    const { scene: tower, nodes: towerParts } = useGLTF('/src/assets/WizardTower.glb')

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

            <BlueRobot
                ref={robotRef}
                position={[0, 0, 0]}
                rotation={new Euler(0, 0, 0, "XYZ")}
                moveSpeed={.1}
                bounds={{
                    min: new Vector3(-100, -100, -100), 
                    max: new Vector3(100, 100, 100)
                }}
            />

            <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <planeGeometry args={[500, 500]} />
                <meshStandardMaterial color='orange' />
            </mesh>

            <group ref={useRef()} position={[-50, .01, 0]} scale={[.5, .5, .5]}>
                <primitive object={village} />
                <primitive object={tower} position={[-10, 15, -15]} scale={[5, 5, 5]} />
            </group>

            <Polaroid ref={polaroidRef} position={[30, 0, 0]} scale={[2.5, 2.5, 2.5]} />
                            
            <ambientLight intensity={0.3} />
            <directionalLight position={[5, 10, 7]} intensity={1} />

            <Environment preset="sunset" />
        </>
    )
}
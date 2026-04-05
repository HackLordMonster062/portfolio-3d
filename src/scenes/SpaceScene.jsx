import { useFrame } from "@react-three/fiber"
import { useEffect, useRef, useState } from "react"
import UFO from "/src/components/UFO"
import Stars from "/src/components/Stars"
import FollowCamera from "/src/components/FollowCamera"
import Planet from "/src/components/Planet"
import { Environment, Html } from "@react-three/drei"
import { cameraState } from "../components/FollowCamera"
import { Vector3 } from "three"
import { useNavigate } from 'react-router-dom'
import { Noise } from "noisejs"
import HtmlProximityPanel from "@/components/HtmlProximityPanel"

const noise = new Noise(Math.random())

export default function SpaceScene() {
    const ufoRef = useRef();
    const [currRoute, setRoute] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        cameraState.targetView.copy(new Vector3(0, 0, -100))
    }, [])

    useEffect(() => {
        if (currRoute) {
            navigate(currRoute)
        }
    }, [currRoute])

    useFrame(() => {
        if (ufoRef.current) {
            cameraState.target.copy(ufoRef.current.position)
        }
    })

    const terrain = (position, time) => {
        const noiseHeight = noise.perlin2(position.x * 0.01, position.z * 0.01) * 50
        return new Vector3(0, noiseHeight, 0)
    }

    return (
        <>
            <UFO ref={ufoRef} position={[0, 0, 0]} terrain={terrain} />
            <Stars />
            <FollowCamera />

            <Planet position={[-50, 0, -120]} radius={10} onClick={() => setRoute('project/game-dev')} materialProps={{color: 'green'}} />
            <Planet position={[0, 0, -120]} radius={10} onClick={() => setRoute('project/quantum-potest')} materialProps={{color: 'yellow'}} />
            <Planet position={[50, 0, -120]} radius={10} onClick={() => alert("No Gold For You")} materialProps={{color: 'red'}} />
                
            <ambientLight intensity={0.3} />
            <directionalLight position={[5, 10, 7]} intensity={1} />

            <HtmlProximityPanel position={[0, 0, 0]} triggerRef={ufoRef} visibleDistance={10} />

            <Environment preset="sunset" />
        </>
    )
}
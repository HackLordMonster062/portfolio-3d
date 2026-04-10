import Cluster from "@/components/Cluster";
import FollowCamera, { cameraState } from "@/components/FollowCamera";
import HtmlProximityPanel from "@/components/HtmlProximityPanel";
import Polaroid from "@/components/Polaroid";
import UFO from "@/components/UFO";
import { Environment, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react"
import { Vector3 } from "three";

export default function MainScene() {
    const ufoRef = useRef();

    const polaroidRef = useRef()
    const robotRef = useRef()
    const { scene: robot, nodes: robotParts } = useGLTF('/src/assets/BlueRobot.glb')
    const towerRef = useRef()
    const { scene: tower, nodes: towerParts } = useGLTF('/src/assets/WizardTower.glb')
    const guitarRef = useRef()
    const { scene: guitar, nodes: guitarParts } = useGLTF('/src/assets/Guitar.glb')
    const pianoRef = useRef()
    const { scene: piano, nodes: pianoParts } = useGLTF('/src/assets/Piano.glb')

    const clusters = [
        {
            id: 1,
            enterRadius: 15,
            exitRadius: 18,
            position: [0, 0, -20],
            triggerRef: useRef(false),
            title: "Game dev",
            text: "אני יוצר משחקים. לפעמים אני גם מסיים אותם.",
            content: (
                <>
                    <Polaroid key={0} ref={polaroidRef} position={[12, -4, -6]} scale={[2.5, 2.5, 2.5]} rotation={[15, 40, 20]} />
                    <group ref={robotRef} position={[-4, 6, -2]} scale={[1.8, 1.8, 1.8]} rotation={[.2, .5, 2.1]}>
                        <primitive object={robot} />
                    </group>
                    <group ref={towerRef} position={[-2, -4, 16]} scale={[1.4, 1.4, 1.4]} rotation={[.3, .1, .3]}>
                        <primitive object={tower} />
                    </group>
                </>
            )
        },
        {
            id: 2,
            enterRadius: 15,
            exitRadius: 18,
            position: [20, 0, -110],
            triggerRef: useRef(false),
            title: "מוזיקה",
            text: "אני לומד לנגן, ולפעמים גם יוצר מוזיקה.",
            content: (
                <>
                    <group ref={guitarRef} position={[-2, -4, 4]} scale={[1.4, 1.4, 1.4]} rotation={[.3, .1, .3]}>
                        <primitive object={guitar} />
                    </group>
                    <group ref={pianoRef} position={[3, -2, -5]} scale={[1.4, 1.4, 1.4]} rotation={[.3, .1, .3]}>
                        <primitive object={piano} />
                    </group>
                </>
            )
        }
    ]

    const enterRadius = 15
    const exitRadius = 18

    useFrame(() => {
        if (ufoRef.current) {
            cameraState.target.copy(ufoRef.current.position)

            const isInCluster = clusters.some(cluster => cluster.triggerRef.current)
            const nextCluster = clusters
                .sort((cluster1, cluster2) => cluster1.position[2] < cluster2.position[2])
                .find(cluster => cluster.position[2] < ufoRef.current.position.z)

            if (isInCluster || nextCluster === undefined) {
                cameraState.targetView.copy(ufoRef.current.position).y = 2
            } else {
                cameraState.targetView.copy(new Vector3().fromArray(nextCluster.position)).y = 2
            }
        }
    })
    
    return (
        <>
            <UFO ref={ufoRef} position={[0, 0, 0]} bounds={{min: new Vector3(-40, -10, -300), max: new Vector3(40, 10, 40)}} />
            <FollowCamera />

            {clusters.map((cluster) => (
                <Cluster key={cluster.id} position={cluster.position} enterRadius={cluster.enterRadius} exitRadius={cluster.exitRadius} triggerRef={ufoRef} isTriggeredRef={cluster.triggerRef}>
                    {cluster.content}
                </Cluster>
            ))}

            {clusters.map((cluster) => (
                <HtmlProximityPanel key={cluster.id} position={cluster.position} triggerRef={ufoRef} visibleDistance={cluster.enterRadius}>
                    <div className="bg-gray-900 text-gray-100 p-7 border-4 rounded-2xl border-gray-600">
                        <p className="text-5xl mb-4">{cluster.title}</p>
                        <p className="text-3xl" dir="rtl">
                            {cluster.text}
                        </p>
                    </div>
                </HtmlProximityPanel>
            ))}

            <ambientLight intensity={0.3} />
            <directionalLight position={[5, 10, 7]} intensity={1} />

            <Environment preset="sunset" />
        </>
    )
}
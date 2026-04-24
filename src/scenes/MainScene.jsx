import Cluster from "@/components/Cluster";
import FollowCamera, { cameraState } from "@/components/FollowCamera";
import HtmlProximityPanel from "@/components/HtmlProximityPanel";
import Polaroid from "@/components/Polaroid";
import Stars from "@/components/Stars";
import UFO from "@/components/UFO";
import { Environment, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react"
import { Vector3 } from "three";

export default function MainScene() {
    const ufoRef = useRef();

    const speed = useRef(.5)

    const polaroidRef = useRef()
    const titleRef = useRef()
    const { scene: title } = useGLTF('/src/assets/Title.glb')
    const AstronautRef = useRef()
    const { scene: astronaut } = useGLTF('/src/assets/Astronaut.glb')
    const robotRef = useRef()
    const { scene: robot } = useGLTF('/src/assets/BlueRobot.glb')
    const towerRef = useRef()
    const { scene: tower } = useGLTF('/src/assets/WizardTower.glb')
    const guitarRef = useRef()
    const { scene: guitar } = useGLTF('/src/assets/Guitar.glb')
    const pianoRef = useRef()
    const { scene: piano } = useGLTF('/src/assets/Piano.glb')
    const noteRefs = [useRef(), useRef(), useRef(), useRef()]
    const { scene: note, materials: noteMaterials } = useGLTF('/src/assets/Note.glb')
    const sawBenchRef = useRef()
    const { scene: sawBench } = useGLTF('/src/assets/SawBench.glb')
    const sawRef = useRef()
    const { scene: saw } = useGLTF('/src/assets/Saw.glb')
    const longPlankRef = useRef()
    const { scene: longPlank } = useGLTF('/src/assets/LongPlank.glb')
    const shortPlankRef = useRef()
    const { scene: shortPlank } = useGLTF('/src/assets/ShortPlank.glb')
    const catRef = useRef()
    const { scene: cat } = useGLTF('/src/assets/Cat.glb')
    const craneRef = useRef()
    const { scene: crane } = useGLTF('/src/assets/origami_crane.glb')
    const cubeRef = useRef()
    const { scene: cube } = useGLTF('/src/assets/RubiksCube.glb')
    const sudokuRef = useRef()
    const { scene: sudoku } = useGLTF('/src/assets/Sudoku.glb')
    const pencilRef = useRef()
    const { scene: pencil } = useGLTF('/src/assets/Pencil.glb')
    const screenRef = useRef()
    const { scene: screen } = useGLTF('/src/assets/Screen.glb')

    const clusters = [
        {
            id: 1,
            enterRadius: 15,
            exitRadius: 18,
            position: [0, 0, -150],
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
            enterRadius: 12,
            exitRadius: 15,
            position: [20, 0, -310],
            triggerRef: useRef(false),
            title: "Music",
            text: "אני לומד לנגן, ולפעמים גם יוצר מוזיקה.",
            content: (
                <>
                    <group ref={guitarRef} position={[-2, -6, 5]} scale={[2.2, 2.2, 2.2]} rotation={[.3, .1, .3]}>
                        <primitive object={guitar} />
                    </group>
                    <group ref={pianoRef} position={[3, 3, -1]} scale={[1.2, 1.2, 1.2]} rotation={[.3, .1, .3]}>
                        <primitive object={piano} />
                    </group>
                    <group ref={noteRefs[0]} position={[-10, 2, 2]} scale={[.6, .6, .6]} rotation={[.4, .1, .2]}>
                        <mesh geometry={note.children[0].geometry} castShadow>
                            <meshStandardMaterial color="#000000" emissive="#ffff00" emissiveIntensity={1} />
                        </mesh>
                    </group>
                    <group ref={noteRefs[1]} position={[-2, -1, 15]} scale={[.5, .5, .5]} rotation={[.2, .1, .2]}>
                        <mesh geometry={note.children[0].geometry} castShadow>
                            <meshStandardMaterial color="#000000" emissive="#ff00ff" emissiveIntensity={1} />
                        </mesh>
                    </group>
                    <group ref={noteRefs[2]} position={[11, -2, 4]} scale={[.6, .6, .6]} rotation={[.25, .2, .1]}>
                        <mesh geometry={note.children[0].geometry} castShadow>
                            <meshStandardMaterial color="#000000" emissive="#ff2200" emissiveIntensity={1} />
                        </mesh>
                    </group>
                    <group ref={noteRefs[3]} position={[2, 10, 1]} scale={[.6, .6, .6]} rotation={[.35, .15, .3]}>
                        <mesh geometry={note.children[0].geometry} castShadow>
                            <meshStandardMaterial color="#000000" emissive="#22ff88" emissiveIntensity={1} />
                        </mesh>
                    </group>
                    {/* MAYBE find a way to play the track I created when you enter the cluster */}
                </>
            )
        },
        {
            id: 3,
            enterRadius: 15,
            exitRadius: 18,
            position: [-5, 0, -500],
            triggerRef: useRef(false),
            title: "Crafts",
            text: "אני אוהב ליצור דברים פיזיים.",
            content: (
                <>
                    <group ref={sawBenchRef} position={[-6, -8, 2]} scale={[.9, .9, .9]} rotation={[.3, 3.2, .3]}>
                        <primitive object={sawBench} />
                    </group>
                    <group ref={sawRef} position={[-8, -1.5, 3]} scale={[1.1, 1.1, 1.1]} rotation={[.2, 2.5, .2]}>
                        <primitive object={saw} />
                    </group>
                    <group ref={longPlankRef} position={[-4, -3, 2]} scale={[1, 1, 1]} rotation={[.3, 3.2, .1]}>
                        <primitive object={longPlank} />
                    </group>
                    <group ref={shortPlankRef} position={[-1, -3, 3]} scale={[1, 1, 1]} rotation={[.3, 3.2, .3]}>
                        <primitive object={shortPlank} />
                    </group>
                    <group ref={catRef} position={[7, 4, -3]} scale={[1.4, 1.4, 1.4]} rotation={[-.2, 3.1, -.4]}>
                        <primitive object={cat} />
                    </group>
                    <group ref={craneRef} position={[-10, 5, -2]} scale={[2.5, 2.5, 2.5]} rotation={[-.2, 3.8, -.4]}>
                        <primitive object={crane} />
                    </group>
                    {/*
                    Add:
                    LEGO structure?
                    */}
                </>
            )
        },
        {
            id: 4,
            enterRadius: 15,
            exitRadius: 18,
            position: [2, 0, -710],
            triggerRef: useRef(false),
            title: "Puzzles",
            text: "אני אוהב לפתור בעיות.",
            content: (
                <>
                    <group ref={cubeRef} position={[8, 5, -3]} scale={[1.4, 1.4, 1.4]} rotation={[-.2, 3.1, -.4]}>
                        <primitive object={cube} />
                    </group>
                    <group ref={sudokuRef} position={[-11, 4, -2]} scale={[2.3, 2.3, 2.3]} rotation={[1.6, 0, -.3]}>
                        <primitive object={sudoku} />
                    </group>
                    <group ref={pencilRef} position={[-11, 3, 3]} scale={[1.9, 1.9, 1.9]} rotation={[1.6, 0, 3.5]}>
                        <primitive object={pencil} />
                    </group>
                    <group ref={screenRef} position={[-6, -8, 5]} scale={[2.8, 2.8, 2.8]} rotation={[-.4, 2.9, .2]}>
                        <primitive object={screen} />
                    </group>
                </>
            )
        }
    ]

    useFrame(() => {
        if (ufoRef.current) {
            cameraState.target.copy(ufoRef.current.position)

            const isInCluster = clusters.some(cluster => cluster.triggerRef.current)
            const nextCluster = clusters
                .sort((cluster1, cluster2) => cluster1.position[2] < cluster2.position[2])
                .find(cluster => cluster.position[2] < ufoRef.current.position.z)

            if (isInCluster || nextCluster === undefined) {
                cameraState.targetView.copy(ufoRef.current.position).y = 2
                speed.current = .2
            } else {
                cameraState.targetView.copy(new Vector3().fromArray(nextCluster.position)).y = 2
                speed.current = .5
            }
        }
    })
    
    return (
        <>
            <Stars count={3000} maxDistance={2000} />
            <UFO 
                ref={ufoRef} 
                position={[0, 0, 0]} 
                moveSpeed={speed} 
                bounds={{min: new Vector3(-40, -10, -1000), max: new Vector3(40, 10, 40)}}
            />
            <FollowCamera />

            <group position={[0, 0, -30]}>
                <primitive object={title} position={[0, 5, 0]} scale={[3, 3, 3]} />
                <primitive object={astronaut} position={[0, 15, 0]} scale={[1, 1, 1]} rotation={[0, -1.7, 0]} />
            </group>

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
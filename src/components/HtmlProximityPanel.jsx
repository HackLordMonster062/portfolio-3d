import { Html } from "@react-three/drei";

export default function HtmlProximityPanel({
    position,
    triggerPosition,
    visibleDistance,
}) {
    const panelRef = useRef()
    const [visible, setVisible] = useState(true)

    useFrame(() => {
        if (panelRef.current && playerPositionRef.current) {
            const distance = panelRef.current.position.distanceTo(playerPositionRef.current.position)

            const isNear = distance < 5
            if (isNear !== visible) setVisible(isNear)
        }
    })

    return (
        <mesh ref={panelRef} position={[2, 0, 0]}>
            <planeGeometry args={[2, 2]} />
            {visible && (
                <Html transform>
                    <div className="panel">אני מופיע רק כשאתה קרוב!</div>
                </Html>
            )}
        </mesh>
    )
}
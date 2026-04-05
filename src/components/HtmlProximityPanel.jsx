import { Html } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";

export default function HtmlProximityPanel({
    position,
    triggerRef,
    visibleDistance,
    children
}) {
    const panelRef = useRef()
    const [visible, setVisible] = useState(true)

    useFrame(() => {
        if (panelRef.current && triggerRef.current) {
            const distance = panelRef.current.position.distanceTo(triggerRef.current.position)

            const isNear = distance < visibleDistance
            if (isNear !== visible) setVisible(isNear)
        }
    })

    return (
        <mesh ref={panelRef} position={position}>
            <Html transform className={"overflow-hidden transition-all duration-500 " + (visible ? "opacity-100 translate-0" : "opacity-0 -translate-y-10")}>
                {children}
            </Html>
        </mesh>
    )
}
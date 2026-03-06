import { useFrame } from "@react-three/fiber";
import useKeyboard from "../useKeyboard";
import { clamp } from "three/src/math/MathUtils.js";

export default function usePlayerController(motion, moveSpeed, bounds) {
    const keys = useKeyboard()

    useFrame((state, delta) => {
        const v = motion.current.velocity
        if (keys['KeyW'] || keys['ArrowUp']) v.z = Math.max(-moveSpeed, v.z - 0.01)
        if (keys['KeyS'] || keys['ArrowDown']) v.z = Math.min(moveSpeed, v.z + 0.01)
        if (keys['KeyA'] || keys['ArrowLeft']) v.x = Math.max(-moveSpeed, v.x - 0.01)
        if (keys['KeyD'] || keys['ArrowRight']) v.x = Math.min(moveSpeed, v.x + 0.01)
        
        const pos = motion.current.basePosition

        pos.set(
            clamp(pos.x + v.x, bounds.min.x, bounds.max.x),
            clamp(pos.y + v.y, bounds.min.y, bounds.max.y),
            clamp(pos.z + v.z, bounds.min.z, bounds.max.z)
        )
    })
}
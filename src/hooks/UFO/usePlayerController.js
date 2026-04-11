import { useFrame } from "@react-three/fiber";
import useKeyboard from "../useKeyboard";
import { clamp } from "three/src/math/MathUtils.js";

export default function usePlayerController(motion, moveSpeed, acceleration, bounds) {
    const keys = useKeyboard()

    useFrame((state, delta) => {
        const v = motion.current.velocity
        var isMovingZ = false
        var isMovingX = false

        if (keys['KeyW'] || keys['ArrowUp']) {
            v.z = Math.max(-moveSpeed.current, v.z - acceleration)
            isMovingZ = true
        }
        if (keys['KeyS'] || keys['ArrowDown']) {
            v.z = Math.min(moveSpeed.current, v.z + acceleration)
            isMovingZ = true
        }
        if (keys['KeyA'] || keys['ArrowLeft']) {
            v.x = Math.max(-moveSpeed.current, v.x - acceleration)
            isMovingX = true
        }
        if (keys['KeyD'] || keys['ArrowRight']) {
            v.x = Math.min(moveSpeed.current, v.x + acceleration)
            isMovingX = true
        }

        if (!isMovingZ) motion.current.velocity.z *= 1 - .05
        if (!isMovingX) motion.current.velocity.x *= 1 - .05

        const pos = motion.current.basePosition

        pos.set(
            clamp(pos.x + v.x, bounds.min.x, bounds.max.x),
            clamp(pos.y + v.y, bounds.min.y, bounds.max.y),
            clamp(pos.z + v.z, bounds.min.z, bounds.max.z)
        )
    })
}
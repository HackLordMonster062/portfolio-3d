import { useFrame } from "@react-three/fiber"

export default function useBobbingAnimation(motion, bobAmount, bobSpeed) {
    useFrame((state, delta) => {
        const time = state.clock.getElapsedTime()
        const animHeight = bobAmount * Math.sin(time * bobSpeed)
        motion.current.bobbing.y = animHeight
    })
}
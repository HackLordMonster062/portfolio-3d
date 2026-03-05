import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef, useState, forwardRef, useImperativeHandle, useEffect } from 'react'
import * as THREE from 'three'
import { Noise } from 'noisejs'
import useKeyboard from '/src/hooks/useKeyboard'
import { clamp } from 'three/src/math/MathUtils.js'

const noise = new Noise(Math.random())

const BlueRobot = forwardRef((
    { 
        position,
        rotation,
        moveSpeed = 0.1, 
        spinningSpeed = .2,
        bounds = { min: new THREE.Vector3(-50, -50, -50), max: new THREE.Vector3(50, 50, 50) }
    }, 
    ref
) => {
    const group = useRef()
    const { scene: robot, nodes: robotParts } = useGLTF('/src/assets/BlueRobot.glb')

    const [rotationThresh, setRotationThresh] = useState(0)

    const velocity = useRef(new THREE.Vector3())

    useImperativeHandle(ref, () => ({
        get position() {
            return group.current?.position
        },
        get rotation() {
            return group.current?.rotation
        },
        get current() {
            return group.current
        }
    }), [])

    useEffect(() => {
        if (group.current && position) {
            group.current.position.set(...position)
        }
    }, [position])

    useEffect(() => {
        if (group.current && rotation) {
            group.current.rotation.set(...rotation)
            
            console.log(rotation)
        }
    }, [rotation.x, rotation.y, rotation.z])

    useFrame((state, delta) => {
        if (!group.current) return

        const model = group.current

        const dir = new THREE.Vector3(0, 0, 1).applyEuler(rotation)

        velocity.current = dir.multiplyScalar(moveSpeed)
        const v = velocity.current

        model.position.set(
            clamp(model.position.x + v.x, bounds.min.x, bounds.max.x),
            clamp(model.position.y + v.y, bounds.min.y, bounds.max.y),
            clamp(model.position.z + v.z, bounds.min.z, bounds.max.z)
        )

        velocity.current.multiplyScalar(1 - 0.05)

        setRotationThresh((v) => v + delta)
        const value = noise.simplex2(rotationThresh, 2)
        if (value > .7) {
            const rotate = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), spinningSpeed)
            const currRotation = new THREE.Quaternion().setFromEuler(rotation)

            currRotation.multiply(rotate)

            rotation.setFromQuaternion(currRotation)
        }
    })

    return (
        <group ref={group} position={position}>
            <primitive object={robot} />
        </group>
    )
})

export default BlueRobot

function mapRange(value, inMin, inMax, outMin, outMax) {
    return outMin + ((value - inMin) * (outMax - outMin)) / (inMax - inMin)
}
import { useFrame } from "@react-three/fiber"
import React, { useEffect, useLayoutEffect, useRef, useState } from "react"
import { MathUtils, Vector3 } from "three"

export default function Cluster({
    position,
    triggerRef,
    isTriggeredRef,
    enterRadius = 15,
    exitRadius = 18,
    shrinkFactor = 1,
    squeezeFactor = .3,
    transitionDuration = .2,
    children
}) {
    const groupRef = useRef()
    
    const progress = useRef(0)

    useEffect(() => {
        if (groupRef.current === undefined) return
    }, [groupRef.current])

    useFrame((state, delta) => {
        groupRef.current.children.forEach((child, index) => {
            if (child.userData.origPos === undefined) {
                child.userData.origPos = child.position.clone()
            }
            
            if (child.userData.origScale === undefined) {
                child.userData.origScale = child.scale.clone()
            }
            
            child.position.copy(child.userData.origPos).multiplyScalar(
                isTriggeredRef.current ? MathUtils.lerp(squeezeFactor, 1, progress.current)
                : MathUtils.lerp(1, squeezeFactor, progress.current)
            )
            
            child.scale.copy(child.userData.origScale).multiplyScalar(
                isTriggeredRef.current ? MathUtils.lerp(shrinkFactor, 1, progress.current)
                : MathUtils.lerp(1, shrinkFactor, progress.current)
            )
        })
        
        const distance = triggerRef.current.position.distanceTo(new Vector3(...position))

        if (!isTriggeredRef.current && distance <= enterRadius) {
            isTriggeredRef.current = true
            progress.current = 0
        }

        if (isTriggeredRef.current && distance >= exitRadius) {
            isTriggeredRef.current = false
            progress.current = 0
        }

        if (progress.current < 1) {
            progress.current += delta / transitionDuration
        } else {
            progress.current = 1
        }
    })

    return (
        <group ref={groupRef} position={position}>
            {children}
        </group>
    )
}
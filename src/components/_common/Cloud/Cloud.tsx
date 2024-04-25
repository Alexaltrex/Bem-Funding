'use client'

import {Canvas} from "@react-three/fiber";
import {Cloud, OrbitControls, PerspectiveCamera} from "@react-three/drei";
import * as THREE from "three";
import {Suspense} from "react";
import {Vector3} from "three";

export const CloudComponent = () => {
    return (
        <Canvas >
            <ambientLight intensity={2}/>
            <directionalLight position={[2, 0, 2]} intensity={1.5}/>
            <directionalLight position={[-2, 0, 2]} intensity={1.5}/>

            <Suspense fallback={null}>
                <Cloud position={[0, 0, 0]}
                       seed={1}
                       speed={0.2}
                       opacity={0.75}
                       bounds={new Vector3(8,0,0)}
                       color="#FFF"
                       segments={20}
                />
            </Suspense>

            <PerspectiveCamera makeDefault
                               position={[0, 0, 10]}
            />

            <OrbitControls enableRotate={false}
                           enableZoom={false}
            />
        </Canvas>
    )
}
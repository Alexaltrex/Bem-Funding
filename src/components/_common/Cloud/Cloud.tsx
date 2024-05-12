'use client'

import {Canvas} from "@react-three/fiber";
import {Cloud, OrbitControls, PerspectiveCamera} from "@react-three/drei";
import * as THREE from "three";
import {FC, Suspense} from "react";
import {Vector3} from "three";

interface ICloudComponent {
    seed: number
    speed?: number
    bound?: number
    segments?: number
}

export const CloudComponent: FC<ICloudComponent> = ({
                                                        seed,
                                                        speed = 0.2,
                                                        bound = 8,
                                                        segments = 20,
                                                    }) => {
    return (
        <Canvas>
            <ambientLight intensity={2}/>
            <directionalLight position={[2, 0, 2]} intensity={1.5}/>
            <directionalLight position={[-2, 0, 2]} intensity={1.5}/>

            <Suspense fallback={null}>
                <Cloud position={[0, 0, 0]}
                       seed={seed}
                       speed={speed}
                       opacity={0.75}
                       bounds={new Vector3(bound, 0, 0)}
                       color="#FFF"
                       segments={segments}
                />
            </Suspense>

            <PerspectiveCamera makeDefault
                               position={[0, 0, 11]}
            />

            <OrbitControls enableRotate={false}
                           enableZoom={false}
            />
        </Canvas>
    )
}
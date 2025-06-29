
"use client";

import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Icosahedron, Torus, Sphere } from '@react-three/drei';
import * as THREE from 'three';

function FloatingShape({ position, color, shape, scale = 1 }: { position: [number, number, number], color: string, shape: 'icosahedron' | 'torus' | 'sphere', scale?: number }) {
  const ref = useRef<THREE.Mesh>(null!);

  useFrame((_state, delta) => {
    if (ref.current) {
      ref.current.rotation.x += delta * 0.1;
      ref.current.rotation.y += delta * 0.15;
    }
  });
  
  const getShape = () => {
      switch(shape) {
          case 'icosahedron':
              return <Icosahedron ref={ref} args={[1, 0]} position={position} scale={scale}>
                  <meshStandardMaterial color={color} roughness={0.6} metalness={0.2} />
              </Icosahedron>
          case 'torus':
              return <Torus ref={ref} args={[0.8, 0.3, 16, 100]} position={position} scale={scale}>
                   <meshStandardMaterial color={color} roughness={0.6} metalness={0.2} />
              </Torus>
          case 'sphere':
               return <Sphere ref={ref} args={[1, 32, 32]} position={position} scale={scale}>
                    <meshStandardMaterial color={color} roughness={0.6} metalness={0.2} />
               </Sphere>
      }
  }

  return getShape();
}

export default function HeroAnimation() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  
  return (
    <div className="absolute inset-0 z-0 opacity-50">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        <ambientLight intensity={1.0} />
        <directionalLight position={[5, 5, 5]} intensity={2} />
        <pointLight position={[-5, -5, -5]} intensity={50} color="#faeae5" />

        <FloatingShape position={[-3, 1.5, 0]} color="#e09181" shape="icosahedron" scale={1.2} />
        <FloatingShape position={[3.5, -1.5, -1]} color="#f9e6e1" shape="torus" scale={1.5} />
        <FloatingShape position={[2, 2, -3]} color="#faeae5" shape="sphere" scale={0.8}/>

      </Canvas>
    </div>
  );
}

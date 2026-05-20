'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import { useState, useRef } from 'react';
import * as THREE from 'three';

function QuantumGrid() {
  const ref = useRef<THREE.Points>(null);
  const [sphere] = useState(() => {
    const p = new Float32Array(1500 * 3); // Ditambah sedikit biar makin tersebar penuh
    for (let i = 0; i < 1500; i++) {
      const i3 = i * 3;
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 2.5 + Math.random() * 0.5; // Jangkauan sebaran diperluas
      
      p[i3] = r * Math.sin(phi) * Math.cos(theta);
      p[i3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      p[i3 + 2] = r * Math.cos(phi);
    }
    return p;
  });

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.pointer.y * 0.15;
      ref.current.rotation.y = state.pointer.x * 0.15 + state.clock.getElapsedTime() * 0.02;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#2dd4bf"
          size={0.02}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>
    </group>
  );
}

export default function GlobalBackground() {
  return (
    <div className="fixed inset-0 -z-10 bg-zinc-950">
      {/* Grid siber tipis */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#141417_1px,transparent_1px),linear-gradient(to_bottom,#141417_1px,transparent_1px)] bg-[size:5rem_5rem] opacity-30" />
      
      {/* Efek pendaran neon di tengah */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-teal-500/5 rounded-full blur-[160px] pointer-events-none" />
      
      {/* Canvas 3D */}
      <Canvas camera={{ position: [0, 0, 2.5] }}>
        <ambientLight intensity={0.5} />
        <QuantumGrid />
      </Canvas>
    </div>
  );
}
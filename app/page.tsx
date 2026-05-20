'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import { useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import * as THREE from 'three';

// KOMPONEN 3D: Latar Belakang Awan Partikel Minimalis
function QuantumGrid() {
  const ref = useRef<THREE.Points>(null);
  
  const [sphere] = useState(() => {
    const p = new Float32Array(900 * 3);
    for (let i = 0; i < 900; i++) {
      const i3 = i * 3;
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 2.3 + Math.random() * 0.5;
      
      p[i3] = r * Math.sin(phi) * Math.cos(theta);
      p[i3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      p[i3 + 2] = r * Math.cos(phi);
    }
    return p;
  });

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.pointer.y * 0.1;
      ref.current.rotation.y = state.pointer.x * 0.1 + state.clock.getElapsedTime() * 0.01;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#0d9488"
          size={0.016}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>
    </group>
  );
}

export default function Home() {
  return (
    <div className="relative flex-grow w-full min-h-screen flex flex-col items-center justify-end overflow-hidden bg-zinc-950 select-none">
      
      {/* 1. LAYER TERBAWAH: KANVAS THREE.JS (z-0) */}
      <div className="absolute inset-0 z-0 opacity-40">
        <Canvas camera={{ position: [0, 0, 2.2] }}>
          <ambientLight intensity={0.5} />
          <QuantumGrid />
        </Canvas>
      </div>

      {/* 2. LAYER TENGAH: FOTO PORTRAIT DI BELAKANG TEKS (z-10) */}
      {/* Dioptimalkan: menggunakan opacity-100, mix-blend-normal, serta filter brightness & contrast yang lebih tinggi */}
      <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none layout-photo-wrapper">
        <div className="relative w-full max-w-xl h-[80vh] opacity-100 mix-blend-normal transform -translate-y-12 sm:-translate-y-16">
          <Image
            src="/profiles.png" 
            alt="Hansen Pratama Background"
            fill
            priority
            className="object-contain object-top filter brightness-110 contrast-105 saturate-[1.02]"
          />
          {/* Vignette Gradasi: Menghaluskan tepian foto agar menyatu rapi dengan warna hitam zinc-950 latar belakang */}
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/50 to-transparent bottom-0 h-full w-full" />
          <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/40 via-transparent to-transparent top-0 h-full w-full" />
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-transparent to-zinc-950 h-full w-full" />
        </div>
      </div>

      {/* Pendaran Cahaya Teal Radial */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-teal-500/5 rounded-full blur-[130px] pointer-events-none z-10" />

      {/* 3. LAYER TERATAS: INTERFACES KONTEN TEKS (z-20) */}
      <main className="relative z-20 w-full max-w-3xl px-6 flex flex-col items-center text-center mt-auto mb-16 sm:mb-20 gap-6">
        
        <div className="flex flex-col items-center gap-4">
          {/* Tipografi Judul Utama */}
          <div className="space-y-2">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl text-white drop-shadow-[0_4px_24px_rgba(0,0,0,1)]">
              Hansen Pratama
            </h1>
            <p className="text-sm sm:text-base font-bold text-teal-400 tracking-widest uppercase bg-zinc-950/80 backdrop-blur-md px-4 py-1 rounded-full border border-zinc-900/60 w-fit mx-auto shadow-xl">
              Fullstack Developer
            </p>
          </div>
          
          {/* Deskripsi Pembungkus Glassmorphic Lembut */}
          <div className="max-w-md bg-zinc-950/80 backdrop-blur-md p-4 rounded-2xl border border-zinc-900/60 shadow-2xl">
            <p className="text-zinc-300 text-xs sm:text-sm font-light leading-relaxed">
              Membangun website modern dengan fokus pada performa, tampilan, dan pengalaman pengguna yang nyaman.
            </p>
          </div>
        </div>

        {/* Akses Navigasi Cepat */}
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center">
          <Link
            href="/projects"
            className="group flex h-10 items-center justify-center gap-2 rounded-full bg-white px-8 text-xs font-bold uppercase tracking-wider text-zinc-950 transition-all duration-300 hover:bg-teal-400 hover:shadow-[0_0_25px_rgba(13,148,136,0.4)] active:scale-95 min-w-[155px]"
          >
            <span>Lihat Proyek</span>
            <ArrowUpRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
          
          <Link
            href="/contact"
            className="flex h-10 items-center justify-center rounded-full border border-zinc-800 bg-zinc-950/90 backdrop-blur-md px-8 text-xs font-semibold tracking-wider text-zinc-300 transition-all duration-300 hover:text-white hover:bg-zinc-900 hover:border-zinc-700 active:scale-95 min-w-[155px]"
          >
            Hubungi Saya
          </Link>
        </div>

      </main>
      
    </div>
  );
}
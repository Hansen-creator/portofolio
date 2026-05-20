'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import { useState, useRef } from 'react';
import { 
  Share2, 
  Code2, 
  Compass, 
  Video, 
  Globe2, 
  ArrowUpRight 
} from 'lucide-react';
import * as THREE from 'three';

// Latar Belakang Awan Partikel Minimalis (z-0)
function QuantumGrid() {
  const ref = useRef<THREE.Points>(null);
  
  const [sphere] = useState(() => {
    const p = new Float32Array(400 * 3);
    for (let i = 0; i < 400; i++) {
      const i3 = i * 3;
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 2.4 + Math.random() * 0.6;
      
      p[i3] = r * Math.sin(phi) * Math.cos(theta);
      p[i3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      p[i3 + 2] = r * Math.cos(phi);
    }
    return p;
  });

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.pointer.y * 0.02;
      ref.current.rotation.y = state.pointer.x * 0.02 + state.clock.getElapsedTime() * 0.003;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#0d9488"
          size={0.012}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>
    </group>
  );
}

// Data 4 Kanal Media Sosial dengan Kustomisasi Warna Hover Global
const SOCIAL_CHANNELS = [
  {
    id: 1,
    name: "LinkedIn",
    handle: "Hansen Pratama",
    url: "https://www.linkedin.com/in/hansen-pratama/", 
    icon: Share2, 
    badge: "Professional",
    glowClass: "hover:border-blue-500/40 hover:bg-blue-950/5 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)]",
    iconGlow: "group-hover:text-blue-400 group-hover:border-blue-500/30"
  },
  {
    id: 2,
    name: "GitHub",
    handle: "@hansenpratama", 
    url: "https://github.com/Viscot", 
    icon: Code2,
    badge: "Source Hub",
    glowClass: "hover:border-purple-500/40 hover:bg-purple-950/5 hover:shadow-[0_0_30px_rgba(168,85,247,0.15)]",
    iconGlow: "group-hover:text-purple-400 group-hover:border-purple-500/30"
  },
  {
    id: 3,
    name: "Instagram",
    handle: "@hansennpratamaa", 
    url: "https://instagram.com/hansennpratamaa", 
    icon: Compass, 
    badge: "Social Media",
    glowClass: "hover:border-pink-500/40 hover:bg-pink-950/5 hover:shadow-[0_0_30px_rgba(236,72,153,0.15)]",
    iconGlow: "group-hover:text-pink-400 group-hover:border-pink-500/30"
  },
  {
    id: 4,
    name: "YouTube",
    handle: "Hansen Pratama", 
    url: "https://www.youtube.com/@Viscot.", 
    icon: Video, 
    badge: "Video Content",
    glowClass: "hover:border-red-500/40 hover:bg-red-950/5 hover:shadow-[0_0_30px_rgba(239,68,68,0.15)]",
    iconGlow: "group-hover:text-red-400 group-hover:border-red-500/30"
  }
];

export default function Contact() {
  return (
    <div className="relative w-full min-h-screen flex flex-col items-center justify-start overflow-x-hidden bg-zinc-950 text-white select-none pb-24">
      
      {/* 1. BACKGROUND INTERAKTIF CANVAS */}
      <div className="absolute inset-0 z-0 opacity-20 fixed pointer-events-none">
        <Canvas camera={{ position: [0, 0, 2.2] }}>
          <ambientLight intensity={0.5} />
          <QuantumGrid />
        </Canvas>
      </div>

      {/* Pendaran Nebula Teal Halus */}
      <div className="absolute top-1/4 left-1/3 w-[280px] sm:w-[450px] h-[280px] sm:h-[450px] bg-teal-500/5 rounded-full blur-[90px] sm:blur-[140px] pointer-events-none z-0" />
      <div className="absolute bottom-1/4 right-1/4 w-[280px] sm:w-[400px] h-[280px] sm:h-[400px] bg-teal-500/5 rounded-full blur-[90px] sm:blur-[130px] pointer-events-none z-0" />

      {/* 2. KONTEN UTAMA */}
      <main className="relative z-10 w-full max-w-3xl px-5 mt-16 sm:mt-0 pt-16 sm:pt-24 flex flex-col gap-8 sm:gap-10">
        
        {/* Header Navigasi & Judul */}
        <div className="space-y-4 border-b border-zinc-900 pb-6 w-full">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-teal-400">
              <Globe2 className="h-4 w-4" />
              <span className="text-xs font-bold uppercase tracking-widest">Connect</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white break-words">
              Hubungi Saya
            </h1>
            <div className="h-[2px] w-12 bg-teal-500 rounded-full shadow-[0_0_8px_#0d9488] mt-1" />
            <p className="text-zinc-400 text-xs sm:text-sm font-light max-w-md pt-2 leading-relaxed whitespace-normal break-words">
              Silakan terhubung langsung melalui ekosistem jejaring sosial dan media komunikasi digital resmi saya di bawah ini.
            </p>
          </div>
        </div>

        {/* Grid Media Sosial Berkecepatan Transisi Tinggi (Tanpa Deskripsi) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
          {SOCIAL_CHANNELS.map((social) => {
            const IconComponent = social.icon;
            return (
              <a
                key={social.id}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`group relative flex flex-col justify-between bg-zinc-900/10 backdrop-blur-md p-5 rounded-2xl border border-zinc-900/80 shadow-md transition-all duration-300 min-h-[120px] w-full min-w-0 ${social.glowClass}`}
              >
                {/* Sisi Atas Kartu: Ikon & Badge Kategori */}
                <div className="flex items-start justify-between w-full gap-2">
                  <div className={`p-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-400 transition-all duration-300 shrink-0 ${social.iconGlow}`}>
                    <IconComponent className="h-4 w-4" />
                  </div>
                  <div className="flex items-center gap-2 max-w-[70%]">
                    <span className="text-[9px] font-mono font-medium uppercase tracking-wider bg-zinc-950/80 text-zinc-500 px-2.5 py-0.5 rounded border border-zinc-900/60 truncate">
                      {social.badge}
                    </span>
                    <ArrowUpRight className="h-3.5 w-3.5 text-zinc-600 group-hover:text-zinc-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300 shrink-0" />
                  </div>
                </div>

                {/* Sisi Bawah Kartu: Detail Identitas Akun */}
                <div className="mt-4 w-full min-w-0">
                  <div className="flex flex-col gap-0.5 min-w-0">
                    <h2 className="text-sm sm:text-base font-bold text-zinc-200 group-hover:text-white transition-colors truncate">
                      {social.name}
                    </h2>
                    <span className="text-[10px] sm:text-[11px] font-mono text-zinc-500 group-hover:text-zinc-400 transition-colors truncate">
                      {social.handle}
                    </span>
                  </div>
                </div>

              </a>
            );
          })}
        </div>

      </main>
    </div>
  );
}
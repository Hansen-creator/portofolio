'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import { useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  FolderGit2, 
  ArrowRight,
  Smartphone,
  ExternalLink
} from 'lucide-react';
import * as THREE from 'three';

function QuantumGrid() {
  const ref = useRef<THREE.Points>(null);
  const [sphere] = useState(() => {
    const p = new Float32Array(500 * 3);
    for (let i = 0; i < 500; i++) {
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
      ref.current.rotation.y = state.pointer.x * 0.02 + state.clock.getElapsedTime() * 0.004;
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

export const PROJECTS_DATA = [
  {
    id: "socialhub",
    title: "SocialHub",
    category: "Fullstack Development",
    shortDesc: "Platform sosial seperti Instagram dengan fitur collaborative to-do list untuk berbagi dan mengelola tugas bersama.",
    image: "/preview-socialhub.png", 
    tags: ["Next.js", "TypeScript", "Tailwind", "Firebase"],
  },
  {
    id: "coderoast",
    title: "CodeRoast",
    category: "Frontend Development",
    shortDesc: "Website katalog coffee & non-coffee dengan local storage dan fitur struk pembelian.",
    image: "/preview-coderoast.png", 
    tags: ["React", "Tailwind", "Framer", "FontAwesome"],
  },
  {
    id: "mystore",
    title: "MyStore E-Commerce",
    category: "Fullstack Development",
    shortDesc: "Platform e-commerce terintegrasi dengan Supabase untuk pengelolaan produk dan transaksi online.",
    image: "/preview-mystore.png", 
    tags: ["Next.js", "React", "Tailwind", "Supabase"],
  },
  {
    id: "proflow",
    title: "ProFlow",
    category: "Fullstack Development",
    shortDesc: "Platform produktivitas untuk mencatat keuangan dan mengatur aktivitas harian secara personal.",
    image: "/preview-proflow.png", 
    tags: ["Next.js", "React", "Tailwind", "Firebase"],
  }
];

export default function Projects() {
  return (
    <div className="relative w-full min-h-screen flex flex-col items-center justify-start overflow-x-hidden bg-zinc-950 text-white select-none pb-24">
      
      {/* 1. BACKGROUND CANVAS (z-0) */}
      <div className="absolute inset-0 z-0 opacity-20 fixed pointer-events-none">
        <Canvas camera={{ position: [0, 0, 2.2] }}>
          <ambientLight intensity={0.5} />
          <QuantumGrid />
        </Canvas>
      </div>

      {/* Pendaran Cahaya Teal Radial Halus */}
      <div className="absolute top-1/3 right-1/4 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-teal-500/5 rounded-full blur-[100px] sm:blur-[150px] pointer-events-none z-0" />

      {/* 2. KONTEN UTAMA (z-10) */}
      <main className="relative z-10 w-full max-w-5xl px-5 mt-16 sm:mt-0 pt-16 sm:pt-24 flex flex-col gap-8 sm:gap-10">
        
        {/* Header Judul Halaman */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-zinc-900 pb-6">
          <div className="space-y-2">
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white break-words">
              Proyek Saya
            </h1>
            <div className="h-[2px] w-12 bg-teal-500 rounded-full shadow-[0_0_8px_#0d9488]" />
          </div>
          <p className="text-zinc-500 text-xs sm:text-sm max-w-xs font-light leading-relaxed">
            Kumpulan aplikasi web ujung-ke-ujung (end-to-end) fokus pada arsitektur modern.
          </p>
        </div>

        {/* ================= BAGIAN KHUSUS: MOBILE APP DRIVE LINK ================= */}
        <div className="relative group w-full bg-gradient-to-r from-teal-950/20 via-zinc-900/40 to-zinc-900/10 backdrop-blur-md rounded-2xl border border-teal-500/20 hover:border-teal-500/40 shadow-2xl p-6 sm:p-8 transition-all duration-500 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 overflow-hidden">
          {/* Efek Sorot Latar Belakang */}
          <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-teal-500/10 rounded-full blur-3xl group-hover:bg-teal-500/15 transition-colors pointer-events-none" />
          
          <div className="flex items-start gap-4 min-w-0">
            <div className="p-3 bg-teal-950/50 border border-teal-500/30 rounded-xl text-teal-400 shrink-0 group-hover:scale-110 transition-transform duration-300">
              <Smartphone className="h-6 w-6" />
            </div>
            <div className="space-y-1.5 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-teal-400 bg-teal-950/60 border border-teal-900 px-2 py-0.5 rounded">
                  Mobile Development
                </span>
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-zinc-100 tracking-wide">
                Koleksi Project Aplikasi Mobile
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 font-light leading-relaxed max-w-2xl">
                Akses source code, berkas APK, dokumentasi, beserta aset desain lengkap untuk seluruh project pengembangan aplikasi mobile (Android/iOS) saya langsung di Google Drive.
              </p>
            </div>
          </div>

          <a 
            href="https://drive.google.com/drive/folders/1aWAYeps2LKZLuWvjWxCqrSBDZsEXGZlN?hl=ID"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-teal-500 text-zinc-950 text-xs sm:text-sm font-bold uppercase tracking-wider hover:bg-teal-400 transition-colors shadow-[0_0_15px_rgba(13,148,136,0.3)] hover:shadow-[0_0_20px_rgba(20,184,166,0.5)] shrink-0 group/drive"
          >
            <span>Buka Google Drive</span>
            <ExternalLink className="h-4 w-4 group-hover/drive:translate-x-0.5 group-hover/drive:-translate-y-0.5 transition-transform" />
          </a>
        </div>
        {/* ======================================================================= */}

        {/* Grid Container Kartu Proyek (Web) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          {PROJECTS_DATA.map((project) => (
            <div 
              key={project.id}
              className="group relative flex flex-col bg-zinc-900/10 backdrop-blur-md rounded-2xl border border-zinc-900/80 shadow-xl overflow-hidden hover:border-zinc-800 hover:bg-zinc-900/30 transition-all duration-500 w-full"
            >
              {/* Kontainer Preview Gambar */}
              <div className="relative w-full h-48 sm:h-56 bg-zinc-950 overflow-hidden border-b border-zinc-900/60 flex items-center justify-center shrink-0">
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent z-10 opacity-100" />
                
                {/* Gambar Proyek menggunakan Next/Image */}
                <Image 
                  src={project.image}
                  alt={`Pratinjau Proyek ${project.title}`}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover object-top group-hover:scale-[1.02] transition-transform duration-700 ease-out opacity-90 group-hover:opacity-100"
                />
                
                {/* Badge Kategori - Posisi Kanan Atas */}
                <span className="absolute top-4 right-4 z-20 text-[9px] sm:text-[10px] font-mono font-medium uppercase tracking-wider bg-zinc-950/90 text-teal-400 border border-zinc-800/80 px-2.5 py-1 rounded-full backdrop-blur-sm shadow-lg">
                  {project.category}
                </span>
              </div>

              {/* Detail Konten & Teks */}
              <div className="p-5 sm:p-6 flex flex-col flex-grow justify-between gap-5 min-w-0">
                <div className="space-y-2.5 min-w-0">
                  <h3 className="text-base sm:text-lg font-bold text-zinc-100 tracking-wide group-hover:text-white transition-colors truncate">
                    {project.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-400 font-light leading-relaxed line-clamp-2 break-words">
                    {project.shortDesc}
                  </p>
                </div>

                {/* Tags & Action Link */}
                <div className="space-y-4 pt-4 border-t border-zinc-900/60 min-w-0">
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map((tag, i) => (
                      <span 
                        key={i} 
                        className="text-[9px] sm:text-[10px] font-mono px-2.5 py-1 rounded bg-zinc-900/80 border border-zinc-800 text-zinc-500 group-hover:text-zinc-400 group-hover:border-zinc-700 transition-colors shrink-0"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <Link 
                    href={`/projects/${project.id}`}
                    className="inline-flex items-center gap-1.5 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-teal-400 hover:text-teal-300 transition-colors group/btn w-fit"
                  >
                    <span>Lihat Detail Proyek</span>
                    <ArrowRight className="h-3 w-3 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

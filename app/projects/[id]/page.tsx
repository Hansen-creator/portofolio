'use client';

import { use, useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ArrowLeft, 
  ExternalLink, 
  Layers, 
  Cpu, 
  Database,
  Monitor,
  Smartphone,
  ChevronRight,
  Code2
} from 'lucide-react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

const DETAILED_PROJECTS: Record<string, any> = {
  "socialhub": {
    title: "SocialHub",
    category: "Fullstack Development",
    description: "Platform sosial interaktif seperti pada umumnya, sistem ini yang berbeda dengan platform sosial interaktif biasanya yaitu dilengkapi fitur collaborative to-do list, memungkinkan pengguna berbagi aktivitas, berinteraksi, serta mengelola tugas bersama dalam satu tempat.",
    features: [
      "Berbagi aktivitas dan pembaruan status harian antar pengguna.",
      "Manajemen collaborative to-do list terpusat untuk tugas kelompok.",
      "Interaksi sosial real-time dalam satu ruang dasbor.",
      "Pengelolaan prioritas tugas individu dan bersama."
    ],
    techStack: { 
      frontend: "Next.js / React / Framer Motion", 
      backend: "Firebase Core Services", 
      database: "Firestore / Realtime DB",
      styling: "Tailwind CSS / Font Awesome" 
    },
    liveUrl: "https://socialhub-tfxh.vercel.app/",
    desktopImage: "/desktop-socialhub.png",
    mobileImage: "/mobile-socialhub.png"
  },
  "coderoast": {
    title: "CodeRoast",
    category: "Frontend Development",
    description: "Website katalog modern untuk produk coffee maupun non-coffee yang terhubung dengan local storage, dilengkapi fitur keranjang belanja dan tampilan struk pembelian untuk pengalaman transaksi yang lebih praktis.",
    features: [
      "Eksplorasi daftar menu produk coffee dan non-coffee secara interaktif.",
      "Sistem penyimpanan data belanja dinamis berbasis Local Storage.",
      "Fitur manipulasi kuantitas item di dalam keranjang belanja.",
      "Generasi tampilan struk pembelian instan untuk verifikasi transaksi."
    ],
    techStack: { 
      frontend: "React Component Model", 
      backend: "Client-Side Application Routing", 
      database: "Local Browser State Data",
      styling: "Tailwind CSS / Font Awesome Assets" 
    },
    liveUrl: "https://coderoast-138c.vercel.app/",
    desktopImage: "/desktop-coderoast.png",
    mobileImage: "/mobile-coderoast.png"
  },
  "mystore": {
    title: "MyStore E-Commerce",
    category: "Fullstack Development",
    description: "Platform e-commerce untuk jual beli online yang terintegrasi dengan Supabase, menghadirkan sistem autentikasi, pengelolaan data produk, dan transaksi yang efisien serta responsif.",
    features: [
      "Sistem autentikasi masuk/daftar akun pembeli yang aman.",
      "Pengelolaan katalog katalog data produk secara dinamis.",
      "Manajemen alur transaksi pembelanjaan dari keranjang hingga checkout.",
      "Antarmuka responsif yang mendukung sinkronisasi data instan."
    ],
    techStack: { 
      frontend: "Next.js / React App Structure", 
      backend: "Next.js Server Actions & Handler", 
      database: "Supabase Platform (PostgreSQL)",
      styling: "Tailwind CSS Engine" 
    },
    liveUrl: "https://mystore-ecommerce-ten.vercel.app/login",
    desktopImage: "/desktop-mystore.png",
    mobileImage: "/mobile-mystore.png"
  },
  "proflow": {
    title: "ProFlow",
    category: "Fullstack Development",
    description: "Platform produktivitas personal yang membantu pengguna mencatat keuangan, mengatur aktivitas harian, serta mengelola tugas individu agar lebih terstruktur dan produktif.",
    features: [
      "Pencatatan pos anggaran, pemasukan, serta pengeluaran keuangan.",
      "Pengaturan jadwal serta pengingat matriks aktivitas harian.",
      "Manajemen pelacakan status tugas individu (task tracking).",
      "Sistem pengorganisasian alur kerja personal agar lebih terstruktur."
    ],
    techStack: { 
      frontend: "Next.js / React Ecosystem", 
      backend: "Firebase Auth & Cloud Functions", 
      database: "Cloud Firestore Database Platform",
      styling: "Tailwind CSS Core" 
    },
    liveUrl: "https://proflow-one.vercel.app/auth/login",
    desktopImage: "/desktop-proflow.png",
    mobileImage: "/mobile-proflow.png"
  }
};

function MiniQuantumGrid() {
  const ref = useRef<THREE.Points>(null);
  const [sphere] = useState(() => {
    const p = new Float32Array(250 * 3);
    for (let i = 0; i < 250; i++) {
      const i3 = i * 3;
      p[i3] = (Math.random() - 0.5) * 6;
      p[i3 + 1] = (Math.random() - 0.5) * 6;
      p[i3 + 2] = (Math.random() - 0.5) * 6;
    }
    return p;
  });
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.getElapsedTime() * 0.005;
      ref.current.rotation.x = state.pointer.y * 0.05;
    }
  });
  return (
    <group>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
        <PointMaterial transparent color="#0d9488" size={0.008} sizeAttenuation={true} depthWrite={false} blending={THREE.AdditiveBlending} />
      </Points>
    </group>
  );
}

export default function ProjectDetail({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const project = DETAILED_PROJECTS[resolvedParams.id];

  if (!project) {
    return (
      <div className="w-full min-h-screen bg-zinc-950 flex flex-col items-center justify-center text-white px-5">
        <p className="text-sm text-zinc-400">Proyek tidak ditemukan.</p>
        <Link href="/projects" className="mt-4 px-6 py-2 bg-zinc-900 rounded-full text-xs text-teal-400 uppercase tracking-widest border border-zinc-800 transition-colors hover:bg-zinc-850">
          Kembali ke Showcase
        </Link>
      </div>
    );
  }

  return (
    <div className="relative w-full min-h-screen flex flex-col justify-start bg-zinc-950 text-white select-none pb-32 overflow-x-hidden">
      
      {/* BACKGROUND PARTICLES EFFECT */}
      <div className="absolute inset-0 z-0 opacity-20 fixed pointer-events-none">
        <Canvas camera={{ position: [0, 0, 2] }}>
          <ambientLight intensity={0.5} />
          <MiniQuantumGrid />
        </Canvas>
      </div>
      <div className="absolute top-0 left-0 w-full h-[40vh] bg-gradient-to-b from-teal-500/10 to-transparent pointer-events-none z-0" />

      {/* CONTAINER UTAMA */}
      <main className="relative z-10 w-full max-w-5xl mx-auto px-5 mt-16 sm:mt-0 pt-16 sm:pt-24 flex flex-col gap-10 sm:gap-12">
        
        {/* Navigation & Header Title */}
        <div className="flex flex-col gap-4 sm:gap-5">
          <Link 
            href="/projects" 
            className="w-fit inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-zinc-500 hover:text-teal-400 transition-colors group"
          >
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            Kembali ke Showcase
          </Link>
          
          <div className="space-y-3">
            <span className="px-3 py-1 bg-teal-500/10 border border-teal-500/20 text-[10px] font-mono font-bold text-teal-400 uppercase rounded-full inline-block">
              {project.category}
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight break-words">
              {project.title}
            </h1>
          </div>
        </div>

        {/* INTERFACE PREVIEWS SECTION */}
        <section className="space-y-4 pt-2">
          <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 flex items-center gap-2 mb-2">
            <span>Interface Previews</span>
            <div className="h-[1px] bg-zinc-900 flex-grow" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 items-center w-full">
            
            {/* Desktop View Mockup Frame */}
            <div className="md:col-span-1 lg:col-span-8 flex flex-col gap-3 w-full">
              <div className="flex items-center gap-2 px-1 text-zinc-400">
                <Monitor className="h-3.5 w-3.5 text-teal-500" />
                <span className="text-xs font-medium tracking-wide">Desktop Version Layout</span>
              </div>
              
              <div className="group relative aspect-video bg-zinc-900/40 rounded-2xl border border-zinc-900/80 overflow-hidden shadow-2xl backdrop-blur-md w-full flex flex-col">
                {/* Top Browser Bar */}
                <div className="h-7 bg-zinc-950/80 backdrop-blur-sm flex items-center px-4 gap-1.5 border-b border-zinc-900/40 shrink-0 z-20">
                  <div className="w-2 h-2 rounded-full bg-zinc-800" />
                  <div className="w-2 h-2 rounded-full bg-zinc-800" />
                  <div className="w-2 h-2 rounded-full bg-zinc-800" />
                </div>
                {/* Image Container */}
                <div className="relative flex-grow w-full h-full bg-zinc-950 flex items-center justify-center p-2">
                  <Image 
                    src={project.desktopImage}
                    alt={`${project.title} Desktop View`}
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 50vw"
                    className="object-contain opacity-95 group-hover:opacity-100 transition-opacity duration-500"
                  />
                </div>
              </div>
            </div>

            {/* Mobile View Mockup Frame */}
            <div className="md:col-span-1 lg:col-span-4 flex flex-col gap-3 w-full items-center md:items-start">
              <div className="flex items-center gap-2 px-1 text-zinc-400 self-start">
                <Smartphone className="h-3.5 w-3.5 text-teal-500" />
                <span className="text-xs font-medium tracking-wide">Mobile Responsive Interface</span>
              </div>

              <div className="relative w-full max-w-[260px] h-[380px] sm:h-[420px] md:h-[380px] lg:h-[420px] bg-zinc-950 rounded-[2.5rem] border-[6px] border-zinc-900 shadow-2xl overflow-hidden ring-1 ring-zinc-800/80 backdrop-blur-md group shrink-0 flex items-center justify-center p-3">
                {/* Dynamic Island Notch */}
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-20 h-3.5 bg-zinc-950 rounded-full z-20 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-zinc-900 ml-auto mr-3" />
                </div>
                {/* Mobile Image Container */}
                <div className="relative w-full h-full rounded-[1.8rem] overflow-hidden">
                  <Image 
                    src={project.mobileImage}
                    alt={`${project.title} Mobile View`}
                    fill
                    priority
                    sizes="260px"
                    className="object-cover object-top opacity-95 group-hover:opacity-100 transition-opacity duration-500"
                  />
                </div>
                {/* Bottom Home Indicator Bar */}
                <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-24 h-1 bg-zinc-900 rounded-full z-20" />
              </div>
            </div>

          </div>
        </section>

        {/* DESCRIPTION & TECHNICAL BREAKDOWN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-12 pt-2 w-full">
          
          {/* Sisi Kiri: Overview & Fungsi Platform */}
          <div className="lg:col-span-2 space-y-10 min-w-0">
            <div className="space-y-3">
              <h2 className="text-xs font-bold uppercase tracking-[0.15em] text-teal-400 flex items-center gap-2">
                <div className="w-6 h-[1px] bg-teal-400/40" />
                Project Overview
              </h2>
              <p className="text-zinc-300 text-sm sm:text-base font-light leading-relaxed text-justify whitespace-normal break-words">
                {project.description}
              </p>
            </div>

            <div className="space-y-4">
              {/* PERBAIKAN: Berubah judul menjadi fungsionalitas platform */}
              <h2 className="text-xs font-bold uppercase tracking-[0.15em] text-teal-400 flex items-center gap-2">
                <div className="w-6 h-[1px] bg-teal-400/40" />
                Platform Functions & Capabilities
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
                {project.features.map((feature: string, idx: number) => (
                  <div key={idx} className="flex items-start gap-3 p-4 bg-zinc-900/20 rounded-xl border border-zinc-900/80 min-w-0">
                    <ChevronRight className="h-4 w-4 text-teal-500 mt-0.5 shrink-0" />
                    <span className="text-zinc-400 text-xs sm:text-sm font-light leading-snug break-words whitespace-normal">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sisi Kanan: Spesifikasi Teknologi & Link Launch App */}
          <div className="space-y-6 bg-zinc-900/10 backdrop-blur-md p-6 sm:p-7 rounded-2xl border border-zinc-900 shadow-xl self-start w-full min-w-0">
            <h2 className="text-xs font-bold uppercase tracking-[0.15em] text-teal-400">Technical Stack</h2>
            
            <div className="space-y-4 border-b border-zinc-900/60 pb-5 min-w-0">
              <div className="space-y-1 min-w-0">
                <div className="flex items-center gap-2 text-zinc-500">
                  <Layers className="h-3.5 w-3.5" />
                  <span className="text-[9px] font-mono uppercase tracking-widest">Client Interface</span>
                </div>
                <p className="text-xs font-bold text-zinc-300 break-words">{project.techStack.frontend}</p>
              </div>

              <div className="space-y-1 min-w-0">
                <div className="flex items-center gap-2 text-zinc-500">
                  <Cpu className="h-3.5 w-3.5" />
                  <span className="text-[9px] font-mono uppercase tracking-widest">Server Controller</span>
                </div>
                <p className="text-xs font-bold text-zinc-300 break-words">{project.techStack.backend}</p>
              </div>

              <div className="space-y-1 min-w-0">
                <div className="flex items-center gap-2 text-zinc-500">
                  <Database className="h-3.5 w-3.5" />
                  <span className="text-[9px] font-mono uppercase tracking-widest">Database Platform</span>
                </div>
                <p className="text-xs font-bold text-zinc-300 break-words">{project.techStack.database}</p>
              </div>

              <div className="space-y-1 min-w-0">
                <div className="flex items-center gap-2 text-zinc-500">
                  <Code2 className="h-3.5 w-3.5" />
                  <span className="text-[9px] font-mono uppercase tracking-widest">Styling & UI Assets</span>
                </div>
                <p className="text-xs font-bold text-zinc-300 break-words">{project.techStack.styling}</p>
              </div>
            </div>

            <div className="w-full">
              <a 
                href={project.liveUrl} 
                target="_blank"
                rel="noopener noreferrer"
                className="w-full h-10 flex items-center justify-center gap-2 bg-white rounded-xl text-zinc-950 text-xs font-bold uppercase tracking-widest hover:bg-teal-400 hover:shadow-[0_0_25px_rgba(13,148,136,0.3)] transition-all duration-300 group/btn"
              >
                <span>Launch App</span>
                <ExternalLink className="h-3.5 w-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          </div>

        </div>

      </main>
    </div>
  );
}
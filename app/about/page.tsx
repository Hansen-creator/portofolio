'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import { useState, useRef } from 'react';
import Image from 'next/image';
import { 
  GraduationCap, 
  Award, 
  Code2, 
  ChevronLeft, 
  ChevronRight,
  Terminal,
  Database,
  Layers,
  Layout,
  ExternalLink,
  X,
  Maximize2
} from 'lucide-react';
import * as THREE from 'three';

// Latar Belakang Awan Partikel Minimalis (Sesuai dengan tema utama)
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
      const r = 2.5 + Math.random() * 0.5;
      
      p[i3] = r * Math.sin(phi) * Math.cos(theta);
      p[i3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      p[i3 + 2] = r * Math.cos(phi);
    }
    return p;
  });

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.pointer.y * 0.03;
      ref.current.rotation.y = state.pointer.x * 0.03 + state.clock.getElapsedTime() * 0.005;
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

// Data sertifikat riil milik Anda (Termasuk sertifikat baru dari Microsoft & Dicoding)
const CERTIFICATES = [
  { 
    id: 1, 
    title: "elevAlte with Dicoding Program (1)", 
    issuer: "Microsoft & Dicoding Indonesia", 
    year: "May 26, 2025",
    image: "/cert-elevate.jpg" 
  },
  { 
    id: 2, 
    title: "Full-Stack Web Development Certification", 
    issuer: "Sertifikasi Resmi", 
    year: "2024",
    image: "/cert-fullstack.jpg" 
  },
  { 
    id: 3, 
    title: "AWSome Day Online Conference", 
    issuer: "Amazon Web Services (AWS)", 
    year: "July 2024",
    image: "/cert-awsomeday.jpg" 
  },
  { 
    id: 4, 
    title: "Windows Server 2019-2022 Administration", 
    issuer: "Sertifikasi Kompetensi", 
    year: "2024",
    image: "/cert-windowsserver.jpg" 
  }
];

// Tech Stack dikembalikan ke konfigurasi awal Anda
const TECH_STACKS = [
  { name: "Node.js", icon: Terminal, desc: "Backend Runtime" },
  { name: "SQL Server", icon: Database, desc: "Sistem Basis Data" },
  { name: "Figma", icon: Layout, desc: "UI/UX Design Tools" },
  { name: "React / Next.js", icon: Layers, desc: "Frontend Framework" },
];

export default function About() {
  const [currentCert, setCurrentCert] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const nextCertificate = () => {
    setCurrentCert((prev) => (prev === CERTIFICATES.length - 1 ? 0 : prev + 1));
  };

  const prevCertificate = () => {
    setCurrentCert((prev) => (prev === 0 ? CERTIFICATES.length - 1 : prev - 1));
  };

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
      <div className="absolute top-1/4 left-1/4 w-[250px] sm:w-[400px] h-[250px] sm:h-[400px] bg-teal-500/5 rounded-full blur-[100px] sm:blur-[140px] pointer-events-none z-0" />
      <div className="absolute bottom-1/3 right-1/4 w-[250px] sm:w-[400px] h-[250px] sm:h-[400px] bg-teal-500/5 rounded-full blur-[100px] sm:blur-[140px] pointer-events-none z-0" />

      {/* 2. KONTEN UTAMA (z-10) */}
      <main className="relative z-10 w-full max-w-3xl px-5 mt-16 sm:mt-0 pt-16 sm:pt-24 flex flex-col gap-10 sm:gap-12">

        {/* Header Judul Halaman */}
        <div className="space-y-3">
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-zinc-200 to-zinc-400 break-words">
            Tentang Saya
          </h1>
          <div className="h-[2px] w-12 bg-teal-500 rounded-full shadow-[0_0_8px_#0d9488]" />
        </div>

        {/* Ringkasan Profil Aktual */}
        <section className="bg-zinc-900/20 backdrop-blur-md p-5 sm:p-7 rounded-2xl border border-zinc-900/80 shadow-xl">
          <p className="text-zinc-300 text-sm sm:text-base font-light leading-relaxed text-left sm:text-justify whitespace-normal break-words">
            Saya adalah lulusan mahasiswa S1 Teknologi Informasi Universitas Tarumanagara yang memiliki minat besar pada pengembangan aplikasi berbasis website. Memiliki pengalaman dalam pengembangan full-stack dengan fokus pada penggunaan <span className="text-teal-400 font-medium">React / Next.js</span> sebagai framework frontend dan <span className="text-teal-400 font-medium">Node.js</span> sebagai backend, serta <span className="text-teal-400 font-medium">Microsoft SQL Server</span> sebagai sistem basis data. Saya merancang tampilan menggunakan <span className="text-teal-400 font-medium">Figma</span> sebagai tools utama. Saya memiliki kemampuan beradaptasi dengan cepat terhadap lingkungan, serta memiliki motivasi yang tinggi untuk terus belajar dan berkembang di dunia teknologi.
          </p>
        </section>

        {/* SEKSI: TECH STACK */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-teal-400">
            <Code2 className="h-4 w-4" />
            <h2 className="text-xs font-bold uppercase tracking-widest">Tech Stack & Tools</h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {TECH_STACKS.map((stack, idx) => {
              const IconComponent = stack.icon;
              return (
                <div 
                  key={idx} 
                  className="flex items-center gap-3 bg-zinc-900/30 backdrop-blur-sm p-4 rounded-xl border border-zinc-900 hover:border-zinc-800 hover:bg-zinc-900/60 transition-all duration-300 group"
                >
                  <div className="p-2.5 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-400 group-hover:text-teal-400 group-hover:border-teal-500/20 transition-colors shrink-0">
                    <IconComponent className="h-4 w-4" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-xs sm:text-sm font-semibold text-zinc-200 group-hover:text-white transition-colors truncate">{stack.name}</h3>
                    <p className="text-[11px] text-zinc-500 mt-0.5 truncate">{stack.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* STRUKTUR DUA KOLOM: PENDIDIKAN & SERTIFIKAT */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          
          {/* SEKSI KIRI: PENDIDIKAN */}
          <section className="space-y-4">
            <div className="flex items-center gap-2 text-teal-400">
              <GraduationCap className="h-4 w-4" />
              <h2 className="text-xs font-bold uppercase tracking-widest">Pendidikan</h2>
            </div>
            
            <div className="relative pl-4 border-l border-zinc-900 space-y-6 py-1">
              
              {/* Pendidikan S1 */}
              <div className="relative space-y-1.5">
                <div className="absolute -left-[21px] top-1.5 h-2 w-2 rounded-full bg-teal-500 shadow-[0_0_8px_#0d9488]" />
                <span className="text-[10px] font-mono text-zinc-400 bg-zinc-900/60 px-2 py-0.5 rounded border border-zinc-800 w-fit inline-block">
                  S1 Kelulusan
                </span>
                <h3 className="text-sm font-bold text-zinc-100 pt-1 leading-tight">Teknologi Informasi</h3>
                <p className="text-xs text-zinc-400">Universitas Tarumanagara</p>
                <p className="text-[11px] text-zinc-500 italic leading-normal text-left">
                  Berfokus pada arsitektur web full-stack, optimasi query database relasional, dan rekayasa kebutuhan sistem.
                </p>
              </div>

              {/* Pendidikan SMK */}
              <div className="relative space-y-1.5">
                <div className="absolute -left-[21px] top-1.5 h-2 w-2 rounded-full bg-zinc-700" />
                <span className="text-[10px] font-mono text-zinc-400 bg-zinc-900/60 px-2 py-0.5 rounded border border-zinc-800 w-fit inline-block">
                  Alumni SMK
                </span>
                <h3 className="text-sm font-bold text-zinc-100 pt-1 leading-tight">Akuntansi</h3>
                <p className="text-xs text-zinc-400">SMK Yadika 1</p>
                <p className="text-[11px] text-zinc-500 italic leading-normal text-left">
                  Mempelajari dasar pengelolaan administrasi keuangan, pembukuan, serta ketelitian logika transaksional.
                </p>
              </div>

            </div>
          </section>

          {/* SEKSI KANAN: SERTIFIKAT (DENGAN SLIDER GAMBAR) */}
          <section className="space-y-4">
            <div className="flex items-center gap-2 text-teal-400">
              <Award className="h-4 w-4" />
              <h2 className="text-xs font-bold uppercase tracking-widest">Sertifikasi</h2>
            </div>

            {/* Container Utama Slider */}
            <div className="relative flex flex-col bg-zinc-900/20 backdrop-blur-md rounded-2xl border border-zinc-900 shadow-2xl overflow-hidden group">
              
              {/* Bingkai Komponen Gambar Sertifikat */}
              <div 
                onClick={() => setIsModalOpen(true)}
                className="relative w-full h-40 bg-zinc-950 border-b border-zinc-900 overflow-hidden flex items-center justify-center p-2 cursor-pointer group/frame"
              >
                {/* Overlay Hover Icon Maximize */}
                <div className="absolute inset-0 bg-zinc-950/40 opacity-0 group-hover/frame:opacity-100 flex items-center justify-center transition-opacity z-20">
                  <div className="p-2 rounded-xl bg-zinc-900/80 border border-zinc-800 backdrop-blur-md text-teal-400 flex items-center gap-1.5 text-xs font-medium shadow-2xl">
                    <Maximize2 className="h-3.5 w-3.5" />
                    <span>Perbesar Gambar</span>
                  </div>
                </div>

                <div className="absolute top-3 right-3 z-10 p-1.5 bg-zinc-950/80 backdrop-blur-md rounded-lg border border-zinc-800 text-zinc-400">
                  <ExternalLink className="h-3 w-3" />
                </div>
                
                <div className="relative w-full h-full">
                  <Image 
                    src={CERTIFICATES[currentCert].image}
                    alt={CERTIFICATES[currentCert].title}
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 350px"
                    className="object-contain opacity-90 group-hover:opacity-100 transition-opacity duration-300"
                  />
                </div>
              </div>

              {/* Detail Teks Informasi Sertifikat */}
              <div className="p-5 flex flex-col justify-between min-h-[130px]">
                <div className="space-y-1">
                  <span className="text-[10px] font-mono bg-teal-500/10 text-teal-400 px-2 py-0.5 rounded-full border border-teal-500/10 inline-block">
                    {CERTIFICATES[currentCert].year}
                  </span>
                  <h3 className="text-xs sm:text-sm font-bold text-white pt-2 leading-snug tracking-wide line-clamp-2">
                    {CERTIFICATES[currentCert].title}
                  </h3>
                  <p className="text-[11px] text-zinc-400 truncate mt-0.5">
                    {CERTIFICATES[currentCert].issuer}
                  </p>
                </div>

                {/* Bagian Kontrol Navigasi Bawah */}
                <div className="flex items-center justify-between mt-4 pt-3 border-t border-zinc-900/60">
                  {/* Indikator Dots Aktif */}
                  <div className="flex gap-1.5">
                    {CERTIFICATES.map((_, idx) => (
                      <div 
                        key={idx} 
                        className={`h-1 rounded-full transition-all duration-300 ${idx === currentCert ? 'w-4 bg-teal-500' : 'w-1 bg-zinc-800'}`}
                      />
                    ))}
                  </div>

                  {/* Tombol Aksi Kiri & Kanan */}
                  <div className="flex gap-1">
                    <button 
                      onClick={prevCertificate}
                      className="p-1.5 rounded-lg bg-zinc-950 border border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-white transition-all active:scale-95"
                      aria-label="Previous Certificate"
                    >
                      <ChevronLeft className="h-3.5 w-3.5" />
                    </button>
                    <button 
                      onClick={nextCertificate}
                      className="p-1.5 rounded-lg bg-zinc-950 border border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-white transition-all active:scale-95"
                      aria-label="Next Certificate"
                    >
                      <ChevronRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </div>

            </div>
          </section>

        </div>

      </main>

      {/* ==========================================
          MODAL LIGHTBOX FULLSCREEN VIEW (INTERAKTIF)
          ========================================== */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-zinc-950/90 backdrop-blur-lg p-4 transition-all duration-300 animate-fadeIn"
          onClick={() => setIsModalOpen(false)}
        >
          {/* Close Button Top Right */}
          <button 
            onClick={() => setIsModalOpen(false)}
            className="absolute top-4 right-4 p-2.5 rounded-full bg-zinc-900/80 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700 transition-all active:scale-95 z-50 shadow-2xl"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Container Gambar Modal */}
          <div 
            className="relative w-full max-w-4xl h-[65vh] sm:h-[75vh] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()} // Mencegah modal tertutup ketika gambar di-klik
          >
            <Image
              src={CERTIFICATES[currentCert].image}
              alt={CERTIFICATES[currentCert].title}
              fill
              priority
              sizes="100vw"
              className="object-contain"
            />
          </div>

          {/* Label Informasi di Bawah Gambar Modal */}
          <div 
            className="mt-4 px-6 py-3 bg-zinc-900/60 border border-zinc-900 text-center rounded-xl max-w-md backdrop-blur-md shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-xs text-teal-400 font-mono font-bold tracking-wide">{CERTIFICATES[currentCert].year}</p>
            <h4 className="text-sm font-bold text-white mt-1 leading-snug">{CERTIFICATES[currentCert].title}</h4>
            <p className="text-[11px] text-zinc-400 mt-0.5">{CERTIFICATES[currentCert].issuer}</p>
          </div>
        </div>
      )}

    </div>
  );
}

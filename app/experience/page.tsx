'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import { useState, useRef } from 'react';
import Link from 'next/link';
import { 
  Briefcase, 
  Calendar, 
  MapPin, 
  Terminal,
  FileSpreadsheet,
  ShoppingBag // Ditambahkan untuk ikon Admin E-commerce
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

// Data Pengalaman Kerja Profesional & Magang Industri
const EXPERIENCE_DATA = [
  {
    id: 1,
    role: "Admin E-commerce",
    company: "PT. Zhejiang Yin",
    location: "Jakarta, Indonesia",
    period: "Desember 2025 - Mei 2026",
    icon: ShoppingBag,
    description: "Bertanggung jawab penuh atas manajemen operasional harian toko online, mencakup optimasi listing produk, pemrosesan pesanan, kontrol manajemen inventaris gudang, serta menganalisis tren performa penjualan berkala untuk meningkatkan retensi dan kepuasan pelanggan.",
    skills: ["E-commerce Operations", "Inventory Control", "Sales Data Analysis", "Customer Relationship Management"]
  },
  {
    id: 2,
    role: "IT Support (Industrial Internship)",
    company: "PT. Dima Indonesia",
    location: "Jakarta, Indonesia",
    period: "Februari - Agustus 2025",
    icon: Terminal,
    description: "Terlibat aktif dalam pemeliharaan infrastruktur IT internal perusahaan, manajemen administrasi dokumen STTA (Surat Tanda Terima Aset), serta ikut andil dalam pengembangan platform berbasis web Request For Purchasing (RFP) untuk digitalisasi logistik pengadaan barang.",
    skills: ["IT Troubleshooting", "STTA Management", "RFP System Support", "Web Implementation"]
  },
  {
    id: 3,
    role: "Data Entry Intern",
    company: "Kantor Walikota Jakarta Barat",
    location: "Jakarta, Indonesia",
    period: "2021",
    icon: FileSpreadsheet,
    description: "Melakukan digitalisasi dokumen, validasi integritas entri data pemerintahan ke dalam basis data pusat, serta menyusun arsip laporan administrasi secara terstruktur.",
    skills: ["Data Verification", "Administrative Administration", "Microsoft Excel"]
  }
];

export default function Experience() {
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
      <div className="absolute top-1/4 right-1/3 w-[300px] sm:w-[450px] h-[300px] sm:h-[450px] bg-teal-500/5 rounded-full blur-[100px] sm:blur-[140px] pointer-events-none z-0" />
      <div className="absolute bottom-1/3 left-1/4 w-[300px] sm:w-[400px] h-[300px] sm:h-[400px] bg-teal-500/5 rounded-full blur-[100px] sm:blur-[130px] pointer-events-none z-0" />

      {/* 2. KONTEN UTAMA */}
      <main className="relative z-10 w-full max-w-2xl px-5 mt-16 sm:mt-0 pt-16 sm:pt-24 flex flex-col gap-10 sm:gap-12">
        
        {/* Header Judul Halaman */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-zinc-900 pb-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-teal-400">
              <Briefcase className="h-4 w-4" />
              <span className="text-xs font-bold uppercase tracking-widest">Journey</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white break-words">
              Pengalaman
            </h1>
          </div>
          <p className="text-zinc-500 text-xs sm:text-sm max-w-xs font-light leading-relaxed">
            Rekam jejak profesional, magang industri, dan kontribusi saya di dunia kerja.
          </p>
        </div>

        {/* Komponen Linimasa Vertikal (Timeline) */}
        <div className="relative border-l border-zinc-900 ml-3 sm:ml-6 space-y-10 py-2 w-full max-w-xl sm:max-w-2xl">
          {EXPERIENCE_DATA.map((exp) => {
            const IconComponent = exp.icon;
            return (
              <div key={exp.id} className="relative pl-7 sm:pl-10 group w-full min-w-0">
                
                {/* Titik Konektor Linimasa Aktif dengan Ikon */}
                <div className="absolute -left-[17px] top-1.5 h-8 w-8 rounded-xl bg-zinc-950 border border-zinc-900 text-zinc-500 flex items-center justify-center group-hover:text-teal-400 group-hover:border-teal-500/30 transition-all duration-300 shadow-xl z-10 shrink-0">
                  <IconComponent className="h-3.5 w-3.5" />
                </div>

                {/* Garis Glow Efek Hover */}
                <div className="absolute -left-[1px] top-9 bottom-0 w-[1px] bg-gradient-to-b from-teal-500/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                {/* Detail Konten Kartu Pengalaman */}
                <div className="space-y-3 min-w-0 w-full">
                  
                  {/* Meta Data: Waktu dan Lokasi */}
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-[10px] sm:text-[11px] font-mono text-zinc-500 min-w-0">
                    <div className="flex items-center gap-1 bg-zinc-900/40 px-2 py-0.5 rounded border border-zinc-900/60 w-fit text-zinc-400 shrink-0">
                      <Calendar className="h-3 w-3 text-teal-500/70" />
                      <span>{exp.period}</span>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <MapPin className="h-3 w-3" />
                      <span>{exp.location}</span>
                    </div>
                  </div>

                  {/* Judul Posisi Jabatan & Perusahaan */}
                  <div className="space-y-0.5 min-w-0">
                    <h2 className="text-base sm:text-lg font-bold text-zinc-100 group-hover:text-white transition-colors break-words">
                      {exp.role}
                    </h2>
                    <p className="text-xs sm:text-sm font-medium text-teal-400/90 tracking-wide truncate">
                      {exp.company}
                    </p>
                  </div>

                  {/* Deskripsi Tugas Kerja */}
                  <p className="text-xs sm:text-sm text-zinc-400 font-light leading-relaxed text-left sm:text-justify whitespace-normal break-words max-w-xl">
                    {exp.description}
                  </p>

                  {/* Daftar Badge Keahlian Mini */}
                  <div className="flex flex-wrap gap-1.5 pt-1 min-w-0">
                    {exp.skills.map((skill, index) => (
                      <span 
                        key={index}
                        className="text-[9px] sm:text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-900/30 border border-zinc-900 text-zinc-500 group-hover:text-zinc-400 group-hover:border-zinc-800 transition-colors shrink-0"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                </div>
              </div>
            );
          })}
        </div>

      </main>
    </div>
  );
}

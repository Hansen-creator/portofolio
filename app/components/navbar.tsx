'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Activity } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const pathname = usePathname();

  const menuItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Projects', path: '/projects' },
    { name: 'Experience', path: '/experience' },
    { name: 'Contact', path: '/contact' },
  ];

  // Otomatis menutup menu mobile jika ukuran layar berubah ke mode desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <nav className="fixed top-5 left-1/2 -translate-x-1/2 w-[92%] max-w-5xl bg-zinc-950/60 backdrop-blur-xl z-50 border border-zinc-800/50 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.7)] select-none transition-all duration-300">
      <div className="px-5 sm:px-6 h-14 flex items-center justify-between">
        
        {/* BRAND LOGO */}
        <Link 
          href="/" 
          className="flex items-center gap-2 font-mono text-xs font-black tracking-[0.25em] text-white group shrink-0"
        >
          <Activity className="h-4 w-4 text-teal-400 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300" />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-zinc-200 to-zinc-400">
            HANSEN
          </span>
        </Link>

        {/* NAV ITEMS DESKTOP */}
        <div className="hidden md:flex items-center gap-1 bg-zinc-950/40 p-1 rounded-xl border border-zinc-900/60">
          {menuItems.map((item) => {
            // Menggunakan pemetaan startsWith agar sub-halaman detail dinamis /projects/[id] tetap membuat menu Projects menyala aktif
            const isActive = item.path === '/' 
              ? pathname === '/' 
              : pathname.startsWith(item.path);

            return (
              <Link
                key={item.path}
                href={item.path}
                className={`relative px-4 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all duration-300 min-w-0 ${
                  isActive 
                    ? 'text-teal-400 bg-zinc-900/40' 
                    : 'text-zinc-500 hover:text-zinc-200 hover:bg-zinc-900/10'
                }`}
              >
                <span className="relative z-10">{item.name}</span>
                {isActive && (
                  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-teal-400 rounded-full shadow-[0_0_10px_#0d9488]" />
                )}
              </Link>
            );
          })}
        </div>

        {/* MOBILE TRIGGER BUTTON */}
        <div className="flex md:hidden">
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="p-1.5 rounded-lg bg-zinc-900/40 border border-zinc-800/40 text-zinc-400 hover:text-white transition-colors active:scale-95"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X className="h-4 w-4 transition-transform duration-300 rotate-90" /> : <Menu className="h-4 w-4 transition-transform duration-300" />}
          </button>
        </div>
      </div>

      {/* NAV ITEMS MOBILE EXPANDED MENU */}
      <div 
        className={`md:hidden absolute top-[4.2rem] left-0 right-0 rounded-2xl border border-zinc-900/80 bg-zinc-950/95 backdrop-blur-xl transition-all duration-300 ease-out origin-top px-3 py-3 shadow-2xl ${
          isOpen 
            ? 'opacity-100 scale-100 translate-y-0 visible' 
            : 'opacity-0 scale-95 -translate-y-2 invisible pointer-events-none'
        }`}
      >
        <div className="flex flex-col gap-1.5 w-full">
          {menuItems.map((item) => {
            const isActive = item.path === '/' 
              ? pathname === '/' 
              : pathname.startsWith(item.path);

            return (
              <Link 
                key={item.path} 
                href={item.path} 
                onClick={() => setIsOpen(false)} 
                className={`w-full p-3 rounded-xl text-left text-xs font-semibold uppercase tracking-wider transition-all duration-200 flex items-center justify-between ${
                  isActive 
                    ? 'bg-teal-500/5 text-teal-400 border border-teal-500/10 shadow-[inset_0_0_12px_rgba(13,148,136,0.02)]' 
                    : 'bg-zinc-900/20 text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900/40 border border-transparent'
                }`}
              >
                <span>{item.name}</span>
                {isActive && (
                  <div className="h-1.5 w-1.5 rounded-full bg-teal-500 shadow-[0_0_8px_#0d9488]" />
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
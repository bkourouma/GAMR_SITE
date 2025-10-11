'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b transition-all duration-500 ${
        isScrolled
          ? 'border-gray-200 bg-white/95 backdrop-blur-md shadow-lg'
          : 'border-transparent bg-gradient-to-r from-slate-900/95 via-slate-800/95 to-slate-900/95 backdrop-blur-md'
      }`}
    >
      <div className="container mx-auto flex h-20 items-center justify-between px-6">
        <Link
          href="/"
          className="group relative text-3xl font-bold hover:scale-105 transition-all duration-300"
        >
          <span className="relative z-10 bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 bg-clip-text text-transparent">
            GAMR
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 rounded-lg opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-sm"></div>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="/fonctionnalites"
            className="relative text-sm font-semibold text-white/90 hover:text-white transition-all duration-300 group"
          >
            Fonctionnalités
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 group-hover:w-full transition-all duration-300"></span>
          </Link>
          <Link
            href="/solutions"
            className="relative text-sm font-semibold text-white/90 hover:text-white transition-all duration-300 group"
          >
            Solutions
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 group-hover:w-full transition-all duration-300"></span>
          </Link>
          <Link
            href="/tarifs"
            className="relative text-sm font-semibold text-white/90 hover:text-white transition-all duration-300 group"
          >
            Tarifs
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 group-hover:w-full transition-all duration-300"></span>
          </Link>
          <Link
            href="/a-propos"
            className="relative text-sm font-semibold text-white/90 hover:text-white transition-all duration-300 group"
          >
            À Propos
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 group-hover:w-full transition-all duration-300"></span>
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <Link
            href="/espace-clients"
            className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-white/90 hover:text-white border border-white/30 hover:border-white/60 rounded-lg hover:scale-105 transition-all duration-300 relative group"
          >
            <span className="relative z-10">Espace Clients</span>
            <div className="absolute inset-0 bg-white/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </Link>
          <Link
            href="/demander-demo"
            className="hidden sm:inline-flex text-sm font-semibold text-white/80 hover:text-white hover:scale-105 transition-all duration-300 relative group"
          >
            <span className="relative z-10">Démo</span>
            <div className="absolute inset-0 bg-white/10 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </Link>
          <Link
            href="/essai-gratuit"
            className="relative inline-flex items-center justify-center px-6 py-3 text-sm font-bold text-white bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 hover:shadow-xl hover:-translate-y-1 rounded-xl transition-all duration-300 group overflow-hidden"
          >
            <span className="relative z-10">Essai Gratuit</span>
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </Link>
        </div>
      </div>
    </header>
  );
}

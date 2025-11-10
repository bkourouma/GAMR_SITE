'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { usePathname } from 'next/navigation';

// Separate client component for mobile menu to avoid hydration issues
function MobileMenu({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  return createPortal(
    <div
      className={`md:hidden fixed inset-0 z-[1000] transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
      style={{ backgroundColor: 'rgba(7, 10, 15, 1)' }}
      role="dialog"
      aria-modal="true"
    >
      <div className="fixed top-0 left-0 right-0 h-20" />
      <nav className="container mx-auto px-6 py-8 flex flex-col gap-6">
        <Link
          href="/fonctionnalites"
          className="text-lg font-semibold text-white hover:translate-x-2 transition-all duration-300 py-3 border-b border-white/10"
          onClick={onClose}
        >
          Fonctionnalités
        </Link>
        <Link
          href="/solutions"
          className="text-lg font-semibold text-white hover:translate-x-2 transition-all duration-300 py-3 border-b border-white/10"
          onClick={onClose}
        >
          Solutions
        </Link>
        <Link
          href="/indice-securite"
          className="text-lg font-semibold text-white hover:translate-x-2 transition-all duration-300 py-3 border-b border-white/10"
          onClick={onClose}
        >
          Indice de Sécurité
        </Link>
        <Link
          href="/tarifs"
          className="text-lg font-semibold text-white hover:translate-x-2 transition-all duration-300 py-3 border-b border-white/10"
          onClick={onClose}
        >
          Tarifs
        </Link>
        <Link
          href="/a-propos"
          className="text-lg font-semibold text-white hover:translate-x-2 transition-all duration-300 py-3 border-b border-white/10"
          onClick={onClose}
        >
          À Propos
        </Link>
        <a
          href="https://gamerplatform.engage-360.net/login"
          className="text-lg font-semibold text-white hover:translate-x-2 transition-all duration-300 py-3 border-b border-white/10"
          onClick={onClose}
        >
          Espace Clients
        </a>
        <Link
          href="/demander-demo"
          className="text-lg font-semibold text-white hover:translate-x-2 transition-all duration-300 py-3 border-b border-white/10"
          onClick={onClose}
        >
          Demander une Démo
        </Link>
      </nav>
    </div>,
    document.body
  );
}

// Client-side only component wrapper
function ClientOnly({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  return <>{children}</>;
}

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Close mobile menu when pathname changes (navigation occurs)
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Close mobile menu when clicking outside or on a link
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b transition-all duration-500 border-transparent bg-gradient-to-r from-slate-900/95 via-slate-800/95 to-slate-900/95 backdrop-blur-md`}
    >
      <div className="container mx-auto flex h-20 items-center justify-between px-6">
        <Link
          href="/"
          className="group relative text-3xl font-bold hover:scale-105 transition-all duration-300"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <span className="relative z-10 bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 bg-clip-text text-transparent">
            GAMRdigitale
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 rounded-lg opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-sm"></div>
        </Link>

        {/* Desktop Navigation */}
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
            href="/indice-securite"
            className="relative text-sm font-semibold text-white/90 hover:text-white transition-all duration-300 group"
          >
            Indice de Sécurité
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
          <a
            href="https://gamerplatform.engage-360.net/login"
            className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-white/90 hover:text-white border border-white/30 hover:border-white/60 rounded-lg hover:scale-105 transition-all duration-300 relative group"
          >
            <span className="relative z-10">Espace Clients</span>
            <div className="absolute inset-0 bg-white/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </a>
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
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <span className="relative z-10">Essai Gratuit</span>
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden relative w-10 h-10 flex flex-col items-center justify-center gap-1.5 text-white hover:scale-110 transition-transform duration-300 bg-black/20 rounded-lg backdrop-blur-sm border border-white/20"
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            <span
              className={`w-6 h-0.5 bg-white shadow-lg transition-all duration-300 ${
                isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''
              }`}
            />
            <span
              className={`w-6 h-0.5 bg-white shadow-lg transition-all duration-300 ${
                isMobileMenuOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`w-6 h-0.5 bg-white shadow-lg transition-all duration-300 ${
                isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu (rendered in a portal to escape stacking contexts) */}
      <ClientOnly>
        {isMobileMenuOpen && (
          <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
        )}
      </ClientOnly>
    </header>
  );
}

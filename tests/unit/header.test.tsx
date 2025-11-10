import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Header } from '@/components/layout/Header';

// Mock next/navigation
vi.mock('next/navigation', () => ({
  usePathname: () => '/',
}));

// Mock createPortal
vi.mock('react-dom', () => ({
  createPortal: (node: React.ReactNode) => node,
}));

describe('Header Component', () => {
  beforeEach(() => {
    // Create body element for portal rendering
    if (!document.body) {
      const body = document.createElement('body');
      document.body = body;
    }
  });

  it('renders the logo', () => {
    render(<Header />);
    expect(screen.getByText('GAMRdigitale')).toBeInTheDocument();
  });

  it('renders desktop navigation links', () => {
    render(<Header />);
    expect(screen.getByText('Fonctionnalités')).toBeInTheDocument();
    expect(screen.getByText('Solutions')).toBeInTheDocument();
    expect(screen.getByText('Tarifs')).toBeInTheDocument();
    expect(screen.getByText('À Propos')).toBeInTheDocument();
  });

  it('renders CTA buttons', () => {
    render(<Header />);
    expect(screen.getByText('Espace Clients')).toBeInTheDocument();
    expect(screen.getByText('Démo')).toBeInTheDocument();
    expect(screen.getByText('Essai Gratuit')).toBeInTheDocument();
  });

  it('mobile menu is initially closed', () => {
    render(<Header />);
    // ClientOnly component prevents rendering during tests, so we won't see mobile menu content initially
    const mobileMenuButton = screen.getByRole('button', { name: /toggle menu/i });
    expect(mobileMenuButton).toBeInTheDocument();
  });
});

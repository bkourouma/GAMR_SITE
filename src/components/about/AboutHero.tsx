/**
 * AboutHero Component
 * Hero section for the About page with mission statement
 */

import { COMPANY_INFO } from '@/lib/about-data';

export function AboutHero() {
  return (
    <section className="relative pt-32 pb-20 px-4 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      <div className="container mx-auto max-w-4xl text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">{COMPANY_INFO.name}</h1>
        <p className="text-xl md:text-2xl text-gray-300 leading-relaxed">{COMPANY_INFO.mission}</p>
      </div>
    </section>
  );
}

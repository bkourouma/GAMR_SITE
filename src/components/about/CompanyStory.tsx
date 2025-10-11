/**
 * CompanyStory Component
 * Displays the company history and milestones
 */

import { COMPANY_INFO } from '@/lib/about-data';

export function CompanyStory() {
  return (
    <section className="py-20 px-4 bg-white">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-4xl font-bold text-gray-900 mb-8 text-center">Notre Histoire</h2>
        <div className="prose prose-lg mx-auto text-gray-700 leading-relaxed">
          <p className="mb-6">{COMPANY_INFO.story}</p>

          <h3 className="text-2xl font-semibold text-gray-900 mt-12 mb-6">Nos Jalons</h3>
          <ul className="space-y-4">
            {COMPANY_INFO.milestones.map((milestone, index) => (
              <li key={index} className="flex gap-4">
                <span className="font-bold text-primary-600 min-w-[80px]">{milestone.year}</span>
                <span>{milestone.achievement}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

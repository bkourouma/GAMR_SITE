/**
 * TeamSection Component
 * Displays the team grid
 */

import { TEAM_MEMBERS } from '@/lib/about-data';
import { TeamMemberCard } from './TeamMemberCard';

export function TeamSection() {
  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="container mx-auto max-w-7xl">
        <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Notre Équipe</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {TEAM_MEMBERS.map((member) => (
            <TeamMemberCard key={member.id} member={member} />
          ))}
        </div>
      </div>
    </section>
  );
}

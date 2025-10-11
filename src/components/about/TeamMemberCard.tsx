/**
 * TeamMemberCard Component
 * Displays individual team member information
 */

import Image from 'next/image';
import type { TeamMember } from '@/types/about';

interface TeamMemberCardProps {
  member: TeamMember;
}

export function TeamMemberCard({ member }: TeamMemberCardProps) {
  return (
    <div className="group relative bg-white rounded-xl p-6 shadow-sm hover:shadow-xl transition-all duration-300">
      <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden">
        <Image
          src={member.photo}
          alt={member.name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-300"
        />
      </div>
      <h3 className="text-xl font-bold text-gray-900 text-center mb-1">{member.name}</h3>
      <p className="text-primary-600 font-semibold text-center mb-3">{member.role}</p>
      <p className="text-gray-600 text-sm text-center">{member.bio}</p>
    </div>
  );
}

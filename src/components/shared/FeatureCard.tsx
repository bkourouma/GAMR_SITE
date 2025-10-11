import Link from 'next/link';
import * as Icons from 'lucide-react';

type FeatureCardProps = {
  icon: string;
  title: string;
  description: string;
  href: string;
  featured?: boolean;
  gradient?: string;
};

export function FeatureCard({
  icon,
  title,
  description,
  href,
  featured,
  gradient = 'from-primary-500 to-primary-600',
}: FeatureCardProps) {
  // Convert kebab-case to PascalCase for icon lookup
  const iconName =
    icon.charAt(0).toUpperCase() +
    icon.slice(1).replace(/-([a-z])/g, (_match, letter) => letter.toUpperCase());
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const IconComponent = (Icons as any)[iconName];

  return (
    <Link href={href} className="group block h-full">
      <div className="h-full bg-white rounded-xl border border-gray-200 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group-hover:-translate-y-1">
        {/* Gradient header with icon */}
        <div className={`bg-gradient-to-br ${gradient} p-6 relative`}>
          <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10"></div>
          <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/10 rounded-full -ml-8 -mb-8"></div>

          <div className="relative">
            {featured && (
              <span className="inline-block px-3 py-1 text-xs font-bold text-white bg-white/20 backdrop-blur-sm rounded-full mb-3 border border-white/30">
                ⭐ NOUVEAU
              </span>
            )}
            <div className="w-14 h-14 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30">
              {IconComponent && <IconComponent className="w-7 h-7 text-white" strokeWidth={2} />}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors">
            {title}
          </h3>

          <p className="text-sm text-gray-600 leading-relaxed mb-4">{description}</p>

          <div className="flex items-center text-sm font-semibold text-primary-600 group-hover:gap-2 gap-1 transition-all">
            <span>En savoir plus</span>
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

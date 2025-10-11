import { Star } from 'lucide-react';

type TestimonialCardProps = {
  quote: string;
  authorName: string;
  authorRole: string;
  authorCompany: string;
  rating: number;
};

export function TestimonialCard({
  quote,
  authorName,
  authorRole,
  authorCompany,
  rating,
}: TestimonialCardProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
      {/* Stars */}
      <div className="flex gap-1 mb-4">
        {Array.from({ length: rating }).map((_, i) => (
          <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
        ))}
      </div>

      {/* Quote */}
      <blockquote className="text-gray-700 mb-4 leading-relaxed">&ldquo;{quote}&rdquo;</blockquote>

      {/* Author */}
      <div className="border-t border-gray-100 pt-4">
        <p className="font-semibold text-gray-900">{authorName}</p>
        <p className="text-sm text-gray-600">{authorRole}</p>
        <p className="text-sm text-gray-500">{authorCompany}</p>
      </div>
    </div>
  );
}

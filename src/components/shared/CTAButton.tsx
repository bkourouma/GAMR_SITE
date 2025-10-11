import Link from 'next/link';
import { Button } from '@/components/ui/Button';

type CTAButtonProps = {
  href: string;
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  reassurance?: string;
  className?: string;
  buttonClassName?: string;
};

export function CTAButton({
  href,
  variant = 'primary',
  size = 'md',
  children,
  reassurance,
  className,
  buttonClassName,
}: CTAButtonProps) {
  return (
    <div className={className}>
      <Link href={href}>
        <Button variant={variant} size={size} className={buttonClassName}>
          {children}
        </Button>
      </Link>
      {reassurance && <p className="mt-2 text-sm text-gray-500 text-center">{reassurance}</p>}
    </div>
  );
}

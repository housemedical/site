import { externalProps } from '@/lib/utils';
export function ExternalLink({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) {
  return (
    <a href={href} {...externalProps()} className={className} aria-label={`${typeof children === 'string' ? children : 'External link'} (opens in a new tab)`}>
      {children}
      <span className="sr-only">(opens in a new tab)</span>
    </a>
  );
}

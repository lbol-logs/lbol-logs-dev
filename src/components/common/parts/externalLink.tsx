import { ReactNode } from 'react';

function ExternalLink({ href, className, children }: { href: string, className?: string, children?: ReactNode }) {
  return <a className={className} href={href} target="_blank" rel="noreferrer">{children}</a>;
}

export default ExternalLink;
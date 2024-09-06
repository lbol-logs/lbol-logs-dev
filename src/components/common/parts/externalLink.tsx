import { ReactNode } from 'react';

function ExternalLink({ href, children }: { href: string, children?: ReactNode }) {
  return <a href={href} target="_blank" rel="noreferrer">{children}</a>;
}

export default ExternalLink;
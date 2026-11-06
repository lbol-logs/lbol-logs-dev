import { ReactNode } from 'react';
import { TExternalLinkType } from 'utils/types/others';

function ExternalLink({ href, type, className, children }: { href: string, type?: TExternalLinkType, className?: string, children?: ReactNode }) {
  return <a className={`u-external-link u-external-link--${type || 'unknown'} ${className ?? ''}`} href={href} target="_blank" rel="noreferrer">{children}</a>;
}

export default ExternalLink;
import React from 'react';

import withAnchor from './withAnchor';

export interface ExternalLinkProps {
  href?: string;
  to?: string;
  underline?: 'none' | 'hover' | 'always';
  variant?: 'default' | 'withArrow';
  children: React.ReactNode;
}

const ExternalLink = ({
  href,
  underline,
  variant,
  children,
}: ExternalLinkProps) => (
  <ExternalLink href={href} underline={underline} variant={variant}>
    {children}
  </ExternalLink>
);

const WrappedComponent = withAnchor(ExternalLink);

export default WrappedComponent;

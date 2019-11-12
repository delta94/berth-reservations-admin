import React from 'react';

import withAnchor from './withAnchor';

export interface Props {
  href?: string;
  to?: string;
  underline?: 'none' | 'hover' | 'always';
  variant?: 'default' | 'withArrow';
  children: React.ReactNode;
}

const ExternalLink = ({ href, underline, variant, children }: Props) => (
  <ExternalLink href={href} underline={underline} variant={variant}>
    {children}
  </ExternalLink>
);

const WrappedComponent = withAnchor(ExternalLink);

export default WrappedComponent;

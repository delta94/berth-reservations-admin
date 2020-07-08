import React from 'react';
import classNames from 'classnames';
import { IconAngleRight } from 'hds-react';

import styles from './externalLink.module.scss';

export type ExternalLinkProps = {
  children: React.ReactNode;
  href?: string;
  target?: '_blank' | '_self';
  variant?: 'default' | 'withArrow';
};

const ExternalLink = ({ variant = 'default', href, children, target = '_blank' }: ExternalLinkProps) => {
  return (
    <a className={classNames(styles.link, styles[variant])} href={href} target={target} rel="noopener noreferrer">
      {children}
      {variant === 'withArrow' && <IconAngleRight color="brand" size="m" className={styles.arrow} />}
    </a>
  );
};

export default ExternalLink;

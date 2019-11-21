import React from 'react';
import classNames from 'classnames';

import styles from './externalLink.module.scss';

export type WithAnchorProps = {
  variant?: 'default' | 'withArrow';
  href?: string;
  children: React.ReactNode;
};

const withAnchor = <P extends object>(Component: React.ComponentType<P>) => {
  const Wrapper: React.SFC<P & WithAnchorProps> = ({
    variant = 'default',
    href,
    children,
  }) => {
    return (
      <a
        className={classNames(styles.link, styles[variant])}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    );
  };

  return Wrapper;
};

export default withAnchor;

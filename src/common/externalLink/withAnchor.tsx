import React from 'react';
import classNames from 'classnames';
import { IconAngleRight } from 'hds-react';

import styles from './externalLink.module.scss';
import IconWrapper from '../iconWrapper/IconWrapper';

export type WithAnchorProps = {
  variant?: 'default' | 'withArrow';
  href?: string;
  target?: '_blank' | '_self';
  children: React.ReactNode;
};

const withAnchor = <P extends object>(Component: React.ComponentType<P>) => {
  const Wrapper = ({ variant = 'default', href, children, target = '_blank' }: P & WithAnchorProps) => {
    return (
      <a className={classNames(styles.link, styles[variant])} href={href} target={target} rel="noopener noreferrer">
        {children}
        {variant === 'withArrow' && (
          <IconWrapper icon={IconAngleRight} color="brand" size="s" className={styles.arrow} />
        )}
      </a>
    );
  };

  return Wrapper;
};

export default withAnchor;

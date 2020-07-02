import React from 'react';
import { Link, LinkProps } from 'react-router-dom';
import classNames from 'classnames';

import styles from './internalLink.module.scss';

export type InternalLinkProps = {
  color?: 'standard' | 'critical' | 'brand';
  underlined?: boolean;
} & LinkProps;

const InternalLink = ({ color = 'brand', children, underlined, className, ...props }: InternalLinkProps) => {
  return (
    <Link
      {...props}
      title={typeof children === 'string' ? (children as string) : undefined}
      className={classNames(
        styles.internalLink,
        styles[color],
        {
          [styles.underlined]: underlined,
        },
        className
      )}
    >
      {children}
    </Link>
  );
};

export default InternalLink;

import React from 'react';
import classNames from 'classnames';

import styles from './text.module.scss';

export interface TextProps {
  children: React.ReactNode;
  className?: string;
  color?: 'standard' | 'brand' | 'critical' | 'secondary' | 'info' | 'gray';
  as?: 'span' | 'em' | 'strong' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  size?: 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl' | 'xxl' | 'xxxl';
  weight?: 'bold' | 'normalWeight' | 'light';
  italic?: boolean;
}

const Text = ({ className, color = 'standard', size, as: Element = 'span', weight, italic, children }: TextProps) => {
  return (
    <Element
      className={classNames(
        styles.text,
        styles[color],
        styles[Element],
        size && styles[size],
        weight && styles[weight],
        {
          [styles.italic]: italic,
        },
        className
      )}
    >
      {children}
    </Element>
  );
};

export default Text;

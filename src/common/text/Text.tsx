import React from 'react';
import classNames from 'classnames';

import styles from './text.module.scss';

export interface Props {
  color?: 'standard' | 'brand' | 'critical' | 'secondary' | 'info';
  as?: 'span' | 'em' | 'strong' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  size?: 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl' | 'xxl' | 'xxxl';
  bold?: boolean;
  italic?: boolean;
}

const Text: React.SFC<Props> = ({
  color = 'standard',
  size,
  as: Element = 'span',
  bold,
  italic,
  children,
}) => {
  return (
    <Element
      className={classNames(
        styles.text,
        styles[color],
        styles[Element],
        size && styles[size],
        {
          [styles.bold]: bold,
          [styles.italic]: italic,
        }
      )}
    >
      {children}
    </Element>
  );
};

export default Text;

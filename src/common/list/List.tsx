import React from 'react';
import classNames from 'classnames';

import styles from './list.module.scss';

export interface ListProps {
  size?: 'small' | 'standard' | 'large';
  noBullets?: boolean;
  ordered?: boolean;
}

const List: React.SFC<ListProps> = ({
  size = 'standard',
  ordered,
  noBullets,
  children,
}) => {
  const Element = ordered ? 'ol' : 'ul';

  return (
    <Element
      className={classNames(styles.list, styles[size], {
        [styles.noBullets]: noBullets,
      })}
    >
      {children}
    </Element>
  );
};

export default List;

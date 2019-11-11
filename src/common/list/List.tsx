import React from 'react';
import classNames from 'classnames';

import styles from './list.module.scss';

interface Props {
  size?: 'small' | 'standard' | 'large';
  noBullets?: boolean;
  ordered?: boolean;
}

const List: React.SFC<Props> = ({
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

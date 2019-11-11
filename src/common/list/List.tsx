import React from 'react';
import classNames from 'classnames';

import styles from './list.module.scss';

interface Props {
  size?: 'small' | 'standard' | 'large';
  custom?: boolean;
  ordered?: boolean;
}

const List: React.SFC<Props> = ({
  size = 'standard',
  ordered,
  custom,
  children,
}) => {
  const Element = ordered ? 'ol' : 'ul';

  return (
    <Element
      className={classNames(styles.list, styles[size], {
        [styles.custom]: custom,
      })}
    >
      {children}
    </Element>
  );
};

export default List;

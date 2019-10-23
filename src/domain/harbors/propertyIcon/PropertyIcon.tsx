import React from 'react';
import classNames from 'classnames';

import Icon, { IconNames } from '../../../common/icon/Icon';
import styles from './propertyIcon.module.scss';

type Props = {
  name: IconNames;
  disabled?: boolean;
};

const PropertyIcon = ({ name, disabled }: Props) => {
  return (
    <div
      className={classNames(styles.propertyIcon, {
        [styles.disabled]: disabled,
      })}
    >
      <Icon
        name={name}
        className={classNames({ [styles.disabled]: disabled })}
      />
    </div>
  );
};

export default PropertyIcon;

import React from 'react';
import classNames from 'classnames';

import Text from '../../../common/text/Text';
import styles from './property.module.scss';
import Icon, { IconShapes } from '../../../common/icons/Icon';

interface PropertyProps {
  active?: boolean;
  iconShape?: IconShapes;
  counter?: number;
  label: string;
  className?: string;
}

const Property: React.SFC<PropertyProps> = ({ active = true, counter = 0, label, iconShape, className }) => {
  return (
    <div className={classNames(styles.property, className)}>
      {iconShape ? (
        <Icon color={active ? 'standard' : 'secondary'} shape={iconShape} outlined size="large" />
      ) : (
        <Text color={active ? 'standard' : 'secondary'} as="strong" size="xxxl">
          {counter}
        </Text>
      )}

      <Text className={styles.label} weight="bold" size="s" color={active ? 'standard' : 'secondary'}>
        {label}
      </Text>
    </div>
  );
};

export default Property;

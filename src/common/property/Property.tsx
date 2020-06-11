import React from 'react';
import classNames from 'classnames';

import Text from '../text/Text';
import styles from './property.module.scss';
import IconWrapper from '../iconWrapper/IconWrapper';
import { IconProps } from '../icons';

export interface PropertyProps {
  active?: boolean;
  icon?: (props: IconProps) => React.ReactElement | null;
  counter?: number;
  label: string;
  className?: string;
}

const Property = ({ active = true, counter = 0, label, icon, className }: PropertyProps) => {
  return (
    <div className={classNames(styles.property, className)}>
      {icon ? (
        <IconWrapper color={active ? 'standard' : 'secondary'} icon={icon} outlined size="m" />
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

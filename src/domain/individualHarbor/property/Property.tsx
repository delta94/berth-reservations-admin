import React from 'react';

import Text from '../../../common/text/Text';
import Icon, { IconNames } from '../../../common/icon/Icon';
import styles from './property.module.scss';

interface Props {
  active?: boolean;
  iconName?: IconNames;
  counter?: number;
  label: string;
}

const Property: React.SFC<Props> = ({
  active = true,
  counter = 0,
  label,
  iconName,
}) => {
  return (
    <div className={styles.property}>
      {iconName ? (
        <Icon
          name={iconName}
          size="large"
          color={active ? 'standard' : 'secondary'}
        />
      ) : (
        <Text as="h3" size="xxxl" color={active ? 'standard' : 'secondary'}>
          {counter}
        </Text>
      )}
      <Text as="strong" size="s" color={active ? 'standard' : 'secondary'}>
        {label}
      </Text>
    </div>
  );
};

export default Property;

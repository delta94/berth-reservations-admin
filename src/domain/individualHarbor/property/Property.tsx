import React from 'react';

import Text from '../../../common/text/Text';
import styles from './property.module.scss';

interface PropertyProps {
  active?: boolean;
  Icon?: React.ReactNode;
  counter?: number;
  label: string;
}

const Property: React.SFC<PropertyProps> = ({
  active = true,
  counter = 0,
  label,
  Icon,
}) => {
  return (
    <div className={styles.property}>
      {Icon ? (
        Icon
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

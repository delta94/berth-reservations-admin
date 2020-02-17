import React from 'react';
import classNames from 'classnames';

import Text from '../../../common/text/Text';
import styles from './property.module.scss';
import IconOutline from './IconOutline';

interface PropertyProps {
  active?: boolean;
  Icon?: Function;
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
        <IconOutline>
          <Icon
            className={classNames(styles.icon, {
              [styles.disabled]: false,
            })}
          />
        </IconOutline>
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

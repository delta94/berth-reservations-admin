import React from 'react';
import classNames from 'classnames';

import { ReactComponent as HelsinkiLogoSVG } from '../../assets/icons/helsinki-logo.svg';
import styles from './helsinkiLogo.module.scss';

interface Props {
  size?: 'small' | 'standard' | 'large';
  color?: 'standard' | 'brand' | 'critical' | 'secondary' | 'info' | 'white';
}

const HelsinkiLogo: React.SFC<Props> = ({
  size = 'standard',
  color = 'standard',
}) => {
  return (
    <HelsinkiLogoSVG
      className={classNames(styles.helsinkiLogo, styles[size], styles[color])}
    />
  );
};

export default HelsinkiLogo;

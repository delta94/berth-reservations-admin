import React from 'react';
import { Link } from 'react-router-dom';
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
    <Link to="/">
      <HelsinkiLogoSVG
        className={classNames(styles.helsinkiLogo, styles[size], styles[color])}
      />
    </Link>
  );
};

export default HelsinkiLogo;

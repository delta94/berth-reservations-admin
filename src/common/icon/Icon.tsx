import React from 'react';
import classNames from 'classnames';

import { ReactComponent as angleDown } from '../../assets/icons/angle-down.svg';
import { ReactComponent as angleLeft } from '../../assets/icons/angle-left.svg';
import { ReactComponent as angleUp } from '../../assets/icons/angle-up.svg';
import { ReactComponent as arrowDown } from '../../assets/icons/arrow-down.svg';
import { ReactComponent as arrowRight } from '../../assets/icons/arrow-right.svg';
import { ReactComponent as arrowUp } from '../../assets/icons/arrow-up.svg';
import { ReactComponent as business } from '../../assets/icons/business.svg';
import { ReactComponent as check } from '../../assets/icons/check.svg';
import { ReactComponent as commenting } from '../../assets/icons/commenting-o.svg';
import { ReactComponent as divided } from '../../assets/icons/divided.svg';
import { ReactComponent as dollyEmpty } from '../../assets/icons/dolly-empty.svg';
import { ReactComponent as exclamationCircle } from '../../assets/icons/exclamation-circle.svg';
import { ReactComponent as fence } from '../../assets/icons/fence.svg';
import { ReactComponent as globe } from '../../assets/icons/globe.svg';
import { ReactComponent as helsinkiLogo } from '../../assets/icons/helsinki-logo.svg';
import { ReactComponent as individual } from '../../assets/icons/individual.svg';
import { ReactComponent as noBoat } from '../../assets/icons/noboat.svg';
import { ReactComponent as pencil } from '../../assets/icons/pencil.svg';
import { ReactComponent as plug } from '../../assets/icons/plug.svg';
import { ReactComponent as pole } from '../../assets/icons/pole.svg';
import { ReactComponent as registeredBoat } from '../../assets/icons/registered.svg';
import { ReactComponent as streetLight } from '../../assets/icons/street-light.svg';
import { ReactComponent as times } from '../../assets/icons/times.svg';
import { ReactComponent as tools } from '../../assets/icons/tools.svg';
import { ReactComponent as trash } from '../../assets/icons/trash-o.svg';
import { ReactComponent as trestle } from '../../assets/icons/trestle.svg';
import { ReactComponent as unregisteredBoat } from '../../assets/icons/unregistered.svg';
import { ReactComponent as waterTap } from '../../assets/icons/water-tap.svg';
import styles from './icon.module.scss';

const icons = {
  angleDown,
  angleLeft,
  angleUp,
  arrowDown,
  arrowRight,
  arrowUp,
  business,
  check,
  commenting,
  divided,
  dollyEmpty,
  exclamationCircle,
  fence,
  globe,
  helsinkiLogo,
  individual,
  noBoat,
  pencil,
  plug,
  pole,
  registeredBoat,
  streetLight,
  times,
  tools,
  trash,
  trestle,
  unregisteredBoat,
  waterTap,
};

export type IconNames = keyof typeof icons;

export interface IconProps {
  outlined?: boolean;
  name: IconNames;
  width?: string;
  height?: string;
  size?: 'small' | 'standard' | 'large';
  color?: 'white' | 'black' | 'gray';
}

const Icon: React.SFC<IconProps> = ({
  outlined,
  name,
  color = 'black',
  size = 'standard',
}) => {
  const SvgIcon = icons[name];

  return (
    <div
      className={classNames(styles.icon, styles[size], styles[color], {
        [styles.outlined]: outlined,
      })}
    >
      <SvgIcon className={styles.shape} />
    </div>
  );
};

export default Icon;

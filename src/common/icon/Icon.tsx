import React from 'react';
import classNames from 'classnames';

import { ReactComponent as angleDown } from '../../assets/icons/angle-down.svg';
import { ReactComponent as angleLeft } from '../../assets/icons/angle-left.svg';
import { ReactComponent as angleUp } from '../../assets/icons/angle-up.svg';
import { ReactComponent as applicationsIcon } from '../../assets/icons/applications.svg';
import { ReactComponent as arrowDown } from '../../assets/icons/arrow-down.svg';
import { ReactComponent as arrowRight } from '../../assets/icons/arrow-right.svg';
import { ReactComponent as arrowUp } from '../../assets/icons/arrow-up.svg';
import { ReactComponent as boatIcon } from '../../assets/icons/boat.svg';
import { ReactComponent as business } from '../../assets/icons/business.svg';
import { ReactComponent as check } from '../../assets/icons/check.svg';
import { ReactComponent as commenting } from '../../assets/icons/commenting-o.svg';
import { ReactComponent as contractsIcon } from '../../assets/icons/contracts.svg';
import { ReactComponent as customersIcon } from '../../assets/icons/customers.svg';
import { ReactComponent as divided } from '../../assets/icons/divided.svg';
import { ReactComponent as dollyEmpty } from '../../assets/icons/dolly-empty.svg';
import { ReactComponent as exclamationCircle } from '../../assets/icons/exclamation-circle.svg';
import { ReactComponent as fence } from '../../assets/icons/fence.svg';
import { ReactComponent as globe } from '../../assets/icons/globe.svg';
import { ReactComponent as helsinkiLogo } from '../../assets/icons/helsinki-logo.svg';
import { ReactComponent as communicationsIcon } from '../../assets/icons/icon-comm.svg';
import { ReactComponent as individual } from '../../assets/icons/individual.svg';
import { ReactComponent as invoiceIcon } from '../../assets/icons/invoice.svg';
import { ReactComponent as noBoat } from '../../assets/icons/noboat.svg';
import { ReactComponent as pencil } from '../../assets/icons/pencil.svg';
import { ReactComponent as plug } from '../../assets/icons/plug.svg';
import { ReactComponent as pole } from '../../assets/icons/pole.svg';
import { ReactComponent as registeredBoat } from '../../assets/icons/registered.svg';
import { ReactComponent as remindersIcon } from '../../assets/icons/reminders.svg';
import { ReactComponent as settingsIcon } from '../../assets/icons/settings.svg';
import { ReactComponent as streetLight } from '../../assets/icons/street-light.svg';
import { ReactComponent as times } from '../../assets/icons/times.svg';
import { ReactComponent as tools } from '../../assets/icons/tools.svg';
import { ReactComponent as trash } from '../../assets/icons/trash-o.svg';
import { ReactComponent as trestle } from '../../assets/icons/trestle.svg';
import { ReactComponent as unregisteredBoat } from '../../assets/icons/unregistered.svg';
import { ReactComponent as waterTap } from '../../assets/icons/water-tap.svg';
import { ReactComponent as winterIcon } from '../../assets/icons/winter.svg';
import { ReactComponent as user } from '../../assets/icons/user-o.svg';
import styles from './icon.module.scss';

const icons = {
  angleDown,
  angleLeft,
  angleUp,
  applicationsIcon,
  arrowDown,
  arrowRight,
  arrowUp,
  boatIcon,
  business,
  check,
  commenting,
  communicationsIcon,
  contractsIcon,
  customersIcon,
  divided,
  dollyEmpty,
  exclamationCircle,
  fence,
  globe,
  helsinkiLogo,
  individual,
  invoiceIcon,
  noBoat,
  pencil,
  plug,
  pole,
  registeredBoat,
  remindersIcon,
  settingsIcon,
  streetLight,
  times,
  tools,
  trash,
  trestle,
  unregisteredBoat,
  user,
  waterTap,
  winterIcon,
};

export type IconNames = keyof typeof icons;
export interface IconProps {
  outlined?: boolean;
  name: IconNames;
  width?: string;
  height?: string;
  size?: 'small' | 'standard' | 'large';
  color?: 'standard' | 'brand' | 'critical' | 'secondary' | 'info';
}

const Icon: React.SFC<IconProps> = ({
  outlined,
  name,
  color = 'standard',
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

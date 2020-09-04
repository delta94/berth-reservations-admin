import React, { useState } from 'react';
import classNames from 'classnames';
import { IconAngleDown } from 'hds-react';

import styles from './expandableNavItem.module.scss';

export interface ExpandableProps {
  children: React.ReactNode;
  icon?: JSX.Element;
  label: React.ReactNode;
  onClick?: Function;
}

const ExpandableNavItem = ({ label, onClick, children, icon }: ExpandableProps) => {
  const [expanded, setExpanded] = useState(false);
  const handleClick = () => {
    setExpanded(!expanded);
    onClick && onClick();
  };

  return (
    <>
      <div className={styles.expandableNavItem} onClick={handleClick}>
        <div className={classNames(styles.headerBtn, styles.label)} role="button">
          {icon && <div className={styles.icon}>{icon}</div>}
          <div className={styles.label}>{label}</div>
        </div>
        {children && (
          <div
            className={classNames(styles.headerBtn, styles.arrow, {
              [styles.up]: expanded,
            })}
          >
            <IconAngleDown />
          </div>
        )}
      </div>
      {children && (
        <div
          className={classNames(styles.children, {
            [styles.expanded]: expanded,
          })}
        >
          {children}
        </div>
      )}
    </>
  );
};

export default ExpandableNavItem;

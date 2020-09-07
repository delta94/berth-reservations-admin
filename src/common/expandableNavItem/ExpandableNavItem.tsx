import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { IconAngleDown } from 'hds-react';
import { useLocation } from 'react-router-dom';

import styles from './expandableNavItem.module.scss';

export interface ExpandableProps {
  children: React.ReactNode;
  icon?: JSX.Element;
  label: React.ReactNode;
  onClick?: Function;
  openOn?: string[];
}

const ExpandableNavItem = ({ label, onClick, children, icon, openOn }: ExpandableProps) => {
  const [expanded, setExpanded] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (openOn?.some((path) => location.pathname.includes(path))) {
      setExpanded(true);
    }
  }, [openOn, location.pathname]);

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

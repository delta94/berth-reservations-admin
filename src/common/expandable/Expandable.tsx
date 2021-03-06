import React, { useState } from 'react';
import classNames from 'classnames';
import { IconAngleDown } from 'hds-react';

import styles from './expandable.module.scss';
import Button from '../button/Button';

export interface ExpandableProps {
  children: React.ReactNode;
  label: React.ReactNode;
  onClick?: Function;
}

const Expandable = ({ label, onClick, children }: ExpandableProps) => {
  const [expanded, setExpanded] = useState(false);
  const handleClick = () => {
    setExpanded(!expanded);
    onClick && onClick();
  };

  return (
    <>
      <div className={styles.expandable}>
        <div className={classNames(styles.headerBtn, styles.label)} role="button">
          {label}
        </div>
        {children && (
          <div
            className={classNames(styles.headerBtn, styles.arrow, {
              [styles.up]: expanded,
            })}
          >
            <Button variant="secondary" onClick={handleClick}>
              <IconAngleDown />
            </Button>
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

export default Expandable;

import React, { useState } from 'react';
import classNames from 'classnames';
import { Button } from 'hds-react';

import { IconAngleDown } from '../icons';
import styles from './expandable.module.scss';

export interface ExpandableProps {
  label: React.ReactNode;
  onClick?: Function;
}

const Expandable: React.SFC<ExpandableProps> = ({ label, onClick, children }) => {
  const [expanded, setExpanded] = useState(false);
  const handleClick = () => {
    setExpanded(!expanded);
    onClick && onClick();
  };

  return (
    <>
      <div className={styles.expandable}>
        <div className={classNames(styles.headerBtn, styles.label)} role="button" onClick={handleClick}>
          {label}
        </div>
        {children && (
          <div
            className={classNames(styles.headerBtn, styles.arrow, {
              [styles.up]: expanded,
            })}
          >
            <Button color="secondary" onClick={() => setExpanded(!expanded)}>
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

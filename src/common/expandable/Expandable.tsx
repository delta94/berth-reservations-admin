import React, { useState } from 'react';
import classNames from 'classnames';

import Icon from '../icon/Icon';
import styles from './expandable.module.scss';
import Button from '../button/Button';

export interface ExpandableProps {
  label: React.ReactNode;
  onClick?: Function;
}

const Expandable: React.SFC<ExpandableProps> = ({
  label,
  onClick,
  children,
}) => {
  const [expanded, setExpanded] = useState(false);
  const handleClick = () => {
    setExpanded(!expanded);
    onClick && onClick();
  };

  return (
    <>
      <div className={styles.expandable}>
        <div
          className={classNames(styles.headerBtn, styles.label)}
          role="button"
          onClick={handleClick}
        >
          {label}
        </div>
        {children && (
          <div
            className={classNames(styles.headerBtn, styles.arrow, {
              [styles.up]: expanded,
            })}
          >
            <Button
              variant="text"
              color="secondary"
              onClick={() => setExpanded(!expanded)}
            >
              <Icon name="angleDown" />
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

import React, { useState } from 'react';
import classNames from 'classnames';

import Icon from '../icon/Icon';
import styles from './expandible.module.scss';
import Button from '../button/Button';

interface Props {
  label: React.ReactNode;
  onClick?: Function;
}

const Expandible: React.SFC<Props> = ({ label, onClick, children }) => {
  const [expanded, setExpanded] = useState(false);
  const handleClick = () => {
    setExpanded(!expanded);
    onClick && onClick();
  };
  console.log('expanded', expanded);

  return (
    <>
      <div className={styles.expandible}>
        <div className={classNames(styles.headerBtn, styles.label)}>
          <Button variant="text" color="secondary" onClick={handleClick}>
            {label}
          </Button>
        </div>
        {children && (
          <div
            className={classNames(styles.headerBtn, styles.arrow, {
              [styles.down]: expanded,
            })}
          >
            <Button
              variant="text"
              color="secondary"
              onClick={() => setExpanded(!expanded)}
            >
              <Icon name="angleLeft" />
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

export default Expandible;

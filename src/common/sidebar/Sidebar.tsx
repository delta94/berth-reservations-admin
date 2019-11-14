import React from 'react';

import styles from './sidebar.module.scss';

interface Props {
  className?: string;
  actions?: React.ReactNodeArray;
  children: React.ReactNodeArray;
}

const Sidebar: React.SFC<Props> = ({ actions = [], children }) => {
  const mainElements = children.map((child, i) => (
    <div key={i} className={styles.elementWrapper}>
      {child}
    </div>
  ));
  const actionsElements = actions.map((action, i) => (
    <div key={i} className={styles.elementWrapper}>
      {action}
    </div>
  ));

  return (
    <div className={styles.sidebar}>
      <div className={styles.mainWrapper}>{mainElements}</div>
      <div className={styles.actionsWrapper}>{actionsElements}</div>
    </div>
  );
};

export default Sidebar;

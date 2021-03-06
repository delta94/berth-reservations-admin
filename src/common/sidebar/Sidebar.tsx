import React from 'react';

import styles from './sidebar.module.scss';

export interface SidebarProps {
  className?: string;
  actions?: React.ReactNodeArray;
  children: React.ReactNodeArray;
}

const Sidebar = ({ actions = [], children }: SidebarProps) => {
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
      {!!actions.length && <div className={styles.actionsWrapper}>{actionsElements}</div>}
    </div>
  );
};

export default Sidebar;

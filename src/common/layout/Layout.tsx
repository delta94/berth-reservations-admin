import React from 'react';
import classNames from 'classnames';

import styles from './layout.module.scss';

export interface LayoutProps {
  header: JSX.Element;
  sidebar?: JSX.Element;
  children: React.ReactNode;
  footer?: JSX.Element;
}

const Layout = ({ header, sidebar, children, footer }: LayoutProps) => (
  <main className={classNames(styles.layout, { [styles.noSidebar]: !sidebar })}>
    <header className={styles.header}>{header}</header>
    {sidebar && <nav className={styles.sidebar}>{sidebar}</nav>}
    <div className={styles.content}>{children}</div>
    {footer && <footer className={styles.footer}>{footer}</footer>}
  </main>
);

export default Layout;

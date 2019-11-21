import React from 'react';

import styles from './layout.module.scss';

interface Props {
  header: JSX.Element;
  sidebar: JSX.Element;
  children: React.ReactNode;
  footer?: JSX.Element;
}

const Layout = ({ header, sidebar, children, footer }: Props) => (
  <main className={styles.layout}>
    <header className={styles.header}>{header}</header>
    <nav className={styles.sidebar}>{sidebar}</nav>
    <div className={styles.content}>{children}</div>
    {footer && <footer className={styles.footer}>{footer}</footer>}
  </main>
);

export default Layout;

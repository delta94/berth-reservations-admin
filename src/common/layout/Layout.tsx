import React from 'react';

import styles from './layout.module.scss';

interface Props {
  Header: JSX.Element;
  Sidebar: JSX.Element;
  children: React.ReactNode;
  Footer?: JSX.Element;
}

const Layout = ({ Header, Sidebar, children, Footer }: Props) => (
  <main className={styles.layout}>
    <header className={styles.header}>{Header}</header>
    <nav className={styles.sidebar}>{Sidebar}</nav>
    <div className={styles.content}>{children}</div>
    {Footer}
  </main>
);

export default Layout;

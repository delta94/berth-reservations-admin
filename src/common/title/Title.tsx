import React from 'react';

import styles from './title.module.scss';

interface Props {
  children: React.ReactNode;
}

const Title = ({ children }: Props) => (
  <header className={styles.header}>{children}</header>
);

export default Title;

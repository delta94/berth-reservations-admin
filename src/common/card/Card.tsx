import React from 'react';
import { Container } from 'react-bootstrap';

import styles from './card.module.scss';

const Card = ({
  width,
  Header,
  children,
}: {
  width: string;
  Header: React.FC;
  children: React.ReactChildren;
}) => (
  <div style={{ width }}>
    <Container fluid={true} className={styles.container}>
      <Header />
      {children}
    </Container>
  </div>
);

export default Card;

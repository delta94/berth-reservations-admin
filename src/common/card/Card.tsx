import React from 'react';
import { Container } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';
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
    <Container fluid={true} className={styles.wrapper}>
      <Header />
      {children}
    </Container>
  </div>
);

export default Card;

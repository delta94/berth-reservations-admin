import React from 'react';
import classnames from 'classnames';
import { Container, Row, Col, Nav, Navbar } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './card.module.scss';

const Button = (props: { children: React.ReactNode }) => (
  <button className={classnames(styles.footerButton, 'btn', 'btn-link')}>
    {props.children}
  </button>
);

const EditButton = (props: { children: React.ReactNode }) => (
  <button className={classnames(styles.editButton, 'btn', 'btn-link')}>
    {props.children}
  </button>
);

const HorizontalDelimiter = () => <hr className={styles.hruler} />;

const VerticalDelimiter = () => <hr className={styles.vdivider} />;

const Delimiter = () => (
  <div className="flex-fill">
    <VerticalDelimiter />
    <HorizontalDelimiter />
  </div>
);

const ContentTable = (props: { children: React.ReactNode }) => (
  <table className="table table-borderless">
    <tbody>{props.children}</tbody>
  </table>
);

const Header = (props: { children: React.ReactNode }) => (
  <Navbar bg="primary" variant="dark">
    <Navbar.Brand href="#home">{props.children}</Navbar.Brand>
    <Nav className="mr-auto"></Nav>
  </Navbar>
);

const Paragraph = () => (
  <Container fluid={true} className={styles.wrapper}>
    <Header>Hakemukset(1)</Header>
    <Row>
      <Col md={{ span: 4 }}>
        <EditButton>Edit</EditButton>
        <h1>Venepaikan vaihto</h1>
        <article>
          <ContentTable>
            <tr>
              <td>Jono nro:</td>
              <td>245</td>
            </tr>
            <tr>
              <td>Kirjattu</td>
              <td>23.8.2019 kello 21.06</td>
            </tr>
            <tr>
              <td>Status:</td>
              <td>Ei käsitelty</td>
            </tr>
          </ContentTable>
        </article>
        <h1>Muita tietoja</h1>
      </Col>

      <Delimiter />
      <Col md={{ span: 4 }}>
        <h1>Purjevene / Moottoripursi</h1>
        <article>
          <ContentTable>
            <tr>
              <td>Pituus:</td>
              <td>8,7m</td>
            </tr>
            <tr>
              <td>Leveys:</td>
              <td>3,2m</td>
            </tr>
            <tr>
              <td>Syvyys:</td>
              <td>-</td>
            </tr>
            <tr>
              <td>Paino:</td>
              <td>-</td>
            </tr>
          </ContentTable>
        </article>
        <h1>Tunnistetiedot</h1>

        <article>
          <ContentTable>
            <tr>
              <td>Rekisteritunnus:</td>
              <td>M 12345</td>
            </tr>
            <tr>
              <td>Veneen nimi</td>
              <td>Boaty McBoatface</td>
            </tr>
            <tr>
              <td>Merkki ja Malli:</td>
              <td>Yamarin 123</td>
            </tr>
          </ContentTable>
        </article>
      </Col>

      <Delimiter />
      <Col md={{ span: 4 }}>
        <h1>Paikkatoiveet</h1>
        <article>
          <ContentTable>
            <tr>
              <td>Toive 1:</td>
              <td>Pursilahdenranta</td>
            </tr>
            <tr>
              <td>Toive 2:</td>
              <td>Pursilahdenranta</td>
            </tr>
            <tr>
              <td>Toive 3:</td>
              <td>Pursilahdenranta</td>
            </tr>
            <tr>
              <td>Toive 4:</td>
              <td>Pursilahdenranta</td>
            </tr>
            <tr>
              <td>Toive 5:</td>
              <td>Pursilahdenranta</td>
            </tr>
          </ContentTable>
        </article>
        <h1>Käsittele</h1>
      </Col>
    </Row>
    <Row>
      <footer className={styles.footer}>
        <Button>Lisää uusi</Button>
      </footer>
    </Row>
  </Container>
);

export default Paragraph;

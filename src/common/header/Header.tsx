import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';

const Header = (props: { children: React.ReactNode }) => (
  <Navbar bg="primary" variant="dark">
    <Navbar.Brand>{props.children}</Navbar.Brand>
    <Nav className="mr-auto"></Nav>
  </Navbar>
);

export default Header;

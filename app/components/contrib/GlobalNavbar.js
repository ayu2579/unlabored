import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, NavItem } from 'react-bootstrap';

const GlobalNavbar = () => (
  <Navbar id="global-navbar" fixedTop>
    <Nav pullLeft>
      <LinkContainer to="/explore">
        <NavItem>골라보든가</NavItem>
      </LinkContainer>
      <LinkContainer to="/@riverleo">
        <NavItem>내꺼보든나</NavItem>
      </LinkContainer>
    </Nav>
    <Nav pullRight>
      <LinkContainer to="/new">
        <NavItem>새로올리든가</NavItem>
      </LinkContainer>
    </Nav>
  </Navbar>
);

export default GlobalNavbar;

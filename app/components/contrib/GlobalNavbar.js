import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, NavItem } from 'react-bootstrap';

const GlobalNavbar = () => (
  <Navbar id="global-navbar" fixedTop>
    <Nav pullLeft>
      <LinkContainer to="/explore">
        <NavItem><strong>선택</strong>하거나</NavItem>
      </LinkContainer>
      <LinkContainer to="/@riverleo">
        <NavItem><strong>너꺼</strong>보거나</NavItem>
      </LinkContainer>
    </Nav>
    <Nav pullRight>
      <LinkContainer to="/new">
        <NavItem><strong>새거</strong>올리든가</NavItem>
      </LinkContainer>
    </Nav>
  </Navbar>
);

export default GlobalNavbar;

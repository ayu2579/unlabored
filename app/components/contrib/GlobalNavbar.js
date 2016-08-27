import React, { Component } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import store from '../../store';
import { createAction } from '../../actions';

class GlobalNavbar extends Component {
  constructor(props) {
    super(props);

    this.handleShowsCreateContainer = this.handleShowsCreateContainer.bind(this);
  }

  handleShowsCreateContainer() {
    store.dispatch(createAction.show());
  }

  render() {
    return (
      <Navbar id="global-navbar" fixedBottom>
        <Nav pullLeft>
          <LinkContainer to="/explore">
            <NavItem>피드</NavItem>
          </LinkContainer>
          <LinkContainer to="/search">
            <NavItem>검색</NavItem>
          </LinkContainer>
          <NavItem onClick={this.handleShowsCreateContainer}>
            신규
          </NavItem>
          <LinkContainer to="/notifications">
            <NavItem>알림</NavItem>
          </LinkContainer>
          <LinkContainer to="/profile">
            <NavItem>플필</NavItem>
          </LinkContainer>
        </Nav>
      </Navbar>
    );
  }
}

export default GlobalNavbar;

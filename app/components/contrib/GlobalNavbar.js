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
            <NavItem>
              <i className="icon-hand" />
            </NavItem>
          </LinkContainer>
          <LinkContainer to="/search">
            <NavItem>
              <i className="icon-search" />
            </NavItem>
          </LinkContainer>
          <NavItem
            className="create"
            onClick={this.handleShowsCreateContainer}
          >
            <span>VS</span>
          </NavItem>
          <LinkContainer to="/notifications">
            <NavItem>
              <i className="icon-notification" />
            </NavItem>
          </LinkContainer>
          <LinkContainer to="/profile">
            <NavItem>
              <i className="icon-profile" />
            </NavItem>
          </LinkContainer>
        </Nav>
      </Navbar>
    );
  }
}

export default GlobalNavbar;

/* global window */

import Cookies from 'js-cookie';

import React, { Component } from 'react';
import { ListGroup, ListGroupItem, Button } from 'react-bootstrap';
import store from '../store';
import { loginAction } from '../actions';
import { NavigationBar } from '../components/contrib';

class LoginContainer extends Component {
  constructor(props) {
    super(props);

    this.handleHide = this.handleHide.bind(this);
    this.handleActive = this.handleActive.bind(this);
    this.handleDeactive = this.handleDeactive.bind(this);
    this.handleFacebookLogin = this.handleFacebookLogin.bind(this);
  }

  handleHide() {
    store.dispatch(loginAction.hide());
  }

  handleFacebookLogin() {
    Cookies.set('redirect', window.location.href);
    window.location = '/api/v1/auth/facebook';
  }

  handleActive() {
    this.setState({ active: true });
  }

  handleDeactive() {
    this.setState({ active: false });
  }

  render() {
    const { active } = this.state || {};

    return (
      <div id="login" className="react-container">
        <NavigationBar
          style="primary"
          onPrev={active ? this.handleDeactive : undefined}
          title={active ? '뭘로 로그인할래' : '로그인'}
        />
        {
          (() => {
            if (!active) {
              return (
                <div id="start">
                  <Button onClick={this.handleActive}>한다</Button>
                  <Button onClick={this.handleHide}>안한다</Button>
                </div>
              );
            }

            return (
              <ListGroup>
                <ListGroupItem>
                  카카오톡
                </ListGroupItem>
                <ListGroupItem onClick={this.handleFacebookLogin}>
                  페이스북
                </ListGroupItem>
                <ListGroupItem>
                  이메일
                </ListGroupItem>
              </ListGroup>
            );
          })()
        }
      </div>
    );
  }
}

export default LoginContainer;

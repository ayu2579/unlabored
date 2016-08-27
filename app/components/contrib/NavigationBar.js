import _ from 'lodash';
import classNames from 'classnames';
import React, { Component, PropTypes } from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';

class NavigationBar extends Component {
  constructor(props) {
    super(props);

    this.handlePrev = this.handlePrev.bind(this);
    this.handleExit = this.handleExit.bind(this);
  }

  handlePrev() {
    this.props.onPrev();
  }

  handleExit() {
    this.props.onExit();
  }

  render() {
    const { title, style, leftItems, rightItems, onPrev, onExit } = this.props;

    return (
      <Navbar
        id="navigation-bar"
        className={
          classNames({
            [style]: true,
          })
        }
        fixedTop
      >
        <Nav pullLeft>
          {
            !_.isEmpty(leftItems) &&
              _.map(leftItems, (item, key) =>
                <NavItem
                  key={key}
                  href={item.href}
                  onClick={item.onClick}
                >
                  {item.title}
                </NavItem>
              )
          }
          {
            onPrev &&
              <NavItem onClick={this.handlePrev}>
                뒤로
              </NavItem>
          }
        </Nav>
        <Navbar.Header>
          {title}
        </Navbar.Header>
        <Nav pullRight>
          {
            !_.isEmpty(rightItems) &&
              _.map(rightItems, (item, key) =>
                <NavItem
                  key={key}
                  href={item.href}
                  onClick={item.onClick}
                >
                  {item.title}
                </NavItem>
              )
          }
          {
            onExit &&
              <NavItem onClick={this.handleExit}>
                닫기
              </NavItem>
          }
        </Nav>
      </Navbar>
    );
  }
}

NavigationBar.defaultProps = {
  style: 'default',
  leftItems: [],
  rightItems: [],
};

NavigationBar.propTypes = {
  title: PropTypes.string,
  style: PropTypes.oneOf(['default', 'primary']),
  leftItems: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    href: PropTypes.string,
  })).isRequired,
  rightItems: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    href: PropTypes.string,
  })).isRequired,
  onPrev: PropTypes.func,
  onExit: PropTypes.func,
};

export default NavigationBar;

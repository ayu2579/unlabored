import _ from 'lodash';
import classNames from 'classnames';
import React, { Component, PropTypes } from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

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

  mapItemToNavItem(items) {
    if (_.isEmpty(items)) { return; }

    /* eslint-disable consistent-return */
    return _.map(items, (item, key) => {
    /* eslint-enable consistent-return */
      const navItem = (
        <NavItem
          key={key}
          href={item.href}
          onClick={item.onClick}
        >
          {item.title}
        </NavItem>
      );

      if (_.has(item, 'to')) {
        return (
          <LinkContainer key={key} to={item.to}>
            {navItem}
          </LinkContainer>
        );
      }

      return navItem;
    });
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
          {this.mapItemToNavItem(leftItems)}
          {
            onPrev &&
              <NavItem onClick={this.handlePrev}>
                <i className="icon-previous" />
              </NavItem>
          }
        </Nav>
        <Navbar.Header>
          {title}
        </Navbar.Header>
        <Nav pullRight>
          {this.mapItemToNavItem(rightItems)}
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

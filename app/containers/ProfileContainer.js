import _ from 'lodash';
import { connect } from 'react-redux';

import React, { Component, PropTypes } from 'react';
import { Grid } from 'react-bootstrap';
import { GlobalNavbar, NavigationBar } from '../components/contrib';
import { loginAction } from '../actions';
import { Field } from '../components/profile';

class ProfileContainer extends Component {
  componentDidMount() {
    const { dispatch, me } = this.props;

    if (_.isEqual(me.status, 'failure')) {
      dispatch(loginAction.show());
    }
  }

  render() {
    const { dispatch, me } = this.props;

    const rightItems = [];
    if (_.isEqual(me.status, 'success')) {
      rightItems.push({
        title: '로그아웃',
        href: '/api/v1/auth/logout',
      });
    }

    if (_.isEqual(me.status, 'failure')) {
      rightItems.push({
        title: '로그인',
        onClick: () => dispatch(loginAction.show()),
      });
    }

    return (
      <div id="profile" className="react-container">
        <NavigationBar
          title="내꺼내꺼"
          rightItems={rightItems}
        />

        <Grid>
          {
            (() => {
              if (_.isEqual(me.status, 'failure')) {
                return '로그인 해야 할껄?';
              }

              return (
                <div className="form">
                  <Field
                    label="닉네임"
                    name="nickname"
                  />
                  <Field
                    label="이메일"
                    name="email"
                  />
                  <Field
                    label="내주소"
                    name="username"
                  />
                </div>
              );
            })()
          }
        </Grid>

        <GlobalNavbar />
      </div>
    );
  }
}

ProfileContainer.propTypes = {
  me: PropTypes.shape({
    status: PropTypes.string.isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(state => _.pick(state, ['me', 'profile']))(ProfileContainer);

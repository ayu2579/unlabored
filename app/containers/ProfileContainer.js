import _ from 'lodash';
import { connect } from 'react-redux';

import React, { Component, PropTypes } from 'react';
import { Grid } from 'react-bootstrap';
import { loginAction, profileAction } from '../actions';
import { GlobalNavbar, NavigationBar } from '../components/contrib';
import { AggregationTopic } from '../components/explore';
import { UserInfo, EmptyState } from '../components/profile';

class ProfileContainer extends Component {
  componentDidMount() {
    const { dispatch, me, route } = this.props;

    if (_.isEqual(me.status, 'failure') && _.isEqual(route.path, 'profile')) {
      dispatch(loginAction.show());
      return;
    }

    dispatch(profileAction.get());
  }

  render() {
    const { me, profile, route } = this.props;
    const { data, topicData } = profile;

    return (
      <div id="profile" className="react-container">
        <NavigationBar
          title={data.nickname}
          rightItems={[
            {
              title: '설정',
              to: '/settings',
            },
          ]}
        />

        {
          (() => {
            if (_.isEqual(me.status, 'failure') && _.isEqual(route.path, 'profile')) {
              return <EmptyState />;
            }

            return (
              <div>
                <UserInfo user={data} />
                <Grid>
                  {
                    _.map(topicData.rows, topic =>
                      <AggregationTopic topic={topic} />
                    )
                  }
                </Grid>
              </div>
            );
          })()
        }

        <GlobalNavbar />
      </div>
    );
  }
}

ProfileContainer.propTypes = {
  me: PropTypes.shape({
    status: PropTypes.string.isRequired,
  }).isRequired,
  route: PropTypes.shape({
    path: PropTypes.string.isRequired,
  }).isRequired,
  profile: PropTypes.shape({
    data: PropTypes.object.isRequired,
    status: PropTypes.string.isRequired,
    topicData: PropTypes.object.isRequired,
    topicStatus: PropTypes.string.isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(state => _.pick(state, ['me', 'profile', 'routing']))(ProfileContainer);

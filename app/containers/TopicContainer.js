import _ from 'lodash';
import { connect } from 'react-redux';

import React, { Component, PropTypes } from 'react';
import { history } from '../contrib';
import { topicAction } from '../actions';
import { NavigationBar } from '../components/contrib';
import { AggregationTopic } from '../components/explore';
import { CommentInput } from '../components/topic';

class TopicContainer extends Component {
  constructor(props) {
    super(props);

    const { params } = props;

    this.state = {
      isExternal: !_.isEmpty(params),
    };
  }

  componentDidMount() {
    const { isExternal } = this.state || {};
    const { dispatch, params } = this.props;

    if (isExternal) {
      dispatch(topicAction.get(params.id));
    }
  }

  render() {
    const { isExternal } = this.state || {};
    const { dispatch, topic } = this.props;
    const { data } = topic;

    return (
      <div id="topic" className="react-container">
        <NavigationBar
          onExit={
              () => {
                if (isExternal) {
                  history.push({ pathname: '/' });
                  return;
                }

                dispatch(topicAction.hide());
              }
          }
          title="고르면 비로소 보이는 것들"
        />

        <AggregationTopic topic={data} />

        <CommentInput />
      </div>
    );
  }
}

TopicContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  params: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  }),
  topic: PropTypes.object.isRequired,
};

export default connect(state => _.pick(state, ['topic']))(TopicContainer);

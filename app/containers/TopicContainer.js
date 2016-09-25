import _ from 'lodash';
import { connect } from 'react-redux';

import React, { Component, PropTypes } from 'react';
import { history } from '../contrib';
import { topicAction } from '../actions';
import { NavigationBar } from '../components/contrib';
import { AggregationTopic, CommentList } from '../components/explore';
import { CommentInput } from '../components/topic';

class TopicContainer extends Component {
  componentDidMount() {
    const { dispatch, params } = this.props;

    dispatch(topicAction.init(params.id));
    dispatch(topicAction.fetchComments(params.id));
  }

  render() {
    const { isExternal } = this.state || {};
    const { dispatch, topic } = this.props;
    const { data, fetchCommentsData } = topic;

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
        <CommentList comments={fetchCommentsData.data} />

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

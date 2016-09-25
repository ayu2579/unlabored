import _ from 'lodash';
import classNames from 'classnames';

import React, { Component, PropTypes } from 'react';
import { Panel, ButtonGroup, Button, Image } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Avatar } from '../contrib';
import { VersusTopic, CommentList } from '.';

const SHARES = [
  {
    imageUrl: 'http://static.goongmool.com/kakao.png',
    title: '카카오',
  },
  {
    imageUrl: 'http://static.goongmool.com/facebook.png',
    title: '페이스북',
  },
  {
    imageUrl: 'http://static.goongmool.com/line.png',
    title: '라인',
  },
];

class AggregationTopic extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showsShare: false,
    };

    this.handleToggleShare = this.handleToggleShare.bind(this);
  }

  handleToggleShare() {
    this.setState({ showsShare: !this.state.showsShare });
  }

  render() {
    const { topic } = this.props;
    const { showsShare } = this.state || {};
    const { user, title, tags, comments } = topic;

    return (
      <Panel
        className="aggregation-topic"
        header={
          <div>
            <Avatar user={user} imageOnly />
            <h1>{title}</h1>
            <ul className="tags">
              {_.map(tags, tag => <li key={tag.id}>{tag.title}</li>)}
            </ul>
          </div>
        }
        footer={
          <div>
            <div className="toolbar">
              <ButtonGroup>
                <LinkContainer to={`/topics/${topic.id}`}>
                  <Button>
                    <i className="icon-re" />
                  </Button>
                </LinkContainer>
                <Button
                  className={
                    classNames({
                      'btn-share': true,
                      active: showsShare,
                    })
                  }
                  onClick={this.handleToggleShare}
                >
                  <i className="icon-share" />
                </Button>
              </ButtonGroup>
              <ul className="summary">
                <li>골랐어 4,323</li>
                <li>댓글 2,394</li>
              </ul>
            </div>
            {
              showsShare &&
                <div className="share">
                  {
                    // eslint-disable-next-line no-shadow
                    _.map(SHARES, ({ imageUrl, title }, key) =>
                      <Button key={key}>
                        <Image src={imageUrl} />
                        <p>{title}에 공유</p>
                      </Button>
                    )
                  }
                </div>
            }
            {!_.isEmpty(comments) && <CommentList comments={comments} />}
          </div>
        }
      >
        <VersusTopic topic={topic} />
      </Panel>
    );
  }
}

AggregationTopic.propTypes = {
  topic: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    user: PropTypes.object,
    tags: PropTypes.array,
    comments: PropTypes.array,
  }).isRequired,
};

export default AggregationTopic;

import React, { PropTypes } from 'react';
import { Panel, Image } from 'react-bootstrap';
import { Avatar } from '../contrib';

const FeedItem = ({ feed }) => {
  const { image } = feed;

  return (
    <Panel
      header={
        <Avatar
          user={{
            username: '강동욱',
            image: 'https://scontent.xx.fbcdn.net/v/t1.0-1/p40x40/12308316_10207984181143335_2082751079396892811_n.jpg?oh=7ee81970454226a56c8ca788a96854c6&oe=5820D842',
          }}
        />
      }
      footer={
        'footer'
      }
    >
      <Image src={image} />
    </Panel>
  );
};

FeedItem.propTypes = {
  feed: PropTypes.shape({
    image: PropTypes.string,
  }).isRequired,
};

export default FeedItem;

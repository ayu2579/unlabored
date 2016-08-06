import React from 'react';
import { Avatar } from '../contrib';

const Summary = () => (
  <div id="user-info">
    <Avatar
      user={{
        username: '강동욱',
        image: 'https://scontent.xx.fbcdn.net/v/t1.0-1/p40x40/12308316_10207984181143335_2082751079396892811_n.jpg?oh=7ee81970454226a56c8ca788a96854c6&oe=5820D842',
      }}
    />
  </div>
);

export default Summary;

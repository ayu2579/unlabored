import _ from 'lodash';

import React from 'react';
import { FeedItem } from '../components/feed';

const FeedContainer = () => (
  <div id="feed" className="react-container">
    {
      _.map(_.range(5), key =>
        <FeedItem
          key={key}
          feed={{
            image: 'http://lbizkorea.co.kr/wp-content/uploads/2014/11/naver_com_20141118_151642.jpg',
          }}
        />
      )
    }
  </div>
);

export default FeedContainer;

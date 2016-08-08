import _ from 'lodash';

import React from 'react';
import { AggregationItem } from '../components/explore';

const ExploreContainer = () => (
  <div id="explore" className="react-container">
    {
      _.map(_.range(5), key =>
        <AggregationItem key={key} />
      )
    }
  </div>
);

export default ExploreContainer;

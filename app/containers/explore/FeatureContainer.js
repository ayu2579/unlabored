import _ from 'lodash';

import React from 'react';
import { Grid } from 'react-bootstrap';
import { AggregationItem } from '../../components/explore';

const FeatureContainer = () => (
  <div id="feature" className="react-sub-container">
    <Grid>
      {
        _.map(_.range(5), key =>
          <AggregationItem key={key} />
        )
      }
    </Grid>
  </div>
);

export default FeatureContainer;

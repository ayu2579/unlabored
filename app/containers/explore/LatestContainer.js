import _ from 'lodash';
import { connect } from 'react-redux';

import React, { Component, PropTypes } from 'react';
import { Grid } from 'react-bootstrap';
import { exploreAction } from '../../actions';
import { AggregationTopic } from '../../components/explore';

class LatestContainer extends Component {
  componentDidMount() {
    this.props.dispatch(exploreAction.fetch());
  }

  render() {
    const { fetchData } = this.props.explore;

    return (
      <div id="latest" className="react-sub-container">
        <Grid>
          {
            _.map(fetchData.rows, (topic, key) =>
              <AggregationTopic key={key} topic={topic} />
            )
          }
        </Grid>
      </div>
    );
  }
}

LatestContainer.propTypes = {
  explore: PropTypes.shape({
    fetchData: PropTypes.shape({
      count: PropTypes.number,
      rows: PropTypes.array,
    }),
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(state => _.pick(state, ['explore']))(LatestContainer);

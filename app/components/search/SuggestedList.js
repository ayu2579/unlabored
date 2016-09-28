import _ from 'lodash';

import React, { Component } from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import store from '../../store';
import { searchAction } from '../../actions';

class SuggestedList extends Component {
  componentDidMount() {
    store.dispatch(searchAction.fetchTags());
  }

  render() {
    const { rows } = store.getState().search.fetchTagsData;

    return (
      <ListGroup id="tag-list">
        {_.map(rows, tag => <ListGroupItem key={tag.id}>#{tag.title}</ListGroupItem>)}
      </ListGroup>
    );
  }
}

export default SuggestedList;

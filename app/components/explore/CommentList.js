import _ from 'lodash';
import React, { PropTypes } from 'react';

const CommentList = ({ comments }) => (
  <ul>
    {
      _.map(comments, ({ id, user, text }) =>
        <li key={id}>
          <strong>{user.nickname}</strong>
          {text}
        </li>
      )
    }
  </ul>
);

CommentList.propTypes = {
  comments: PropTypes.array,
};

export default CommentList;

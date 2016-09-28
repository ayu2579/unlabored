import { createAction } from 'redux-actions';

export const INIT = '[API] TOPIC_INIT';
export const POST_COMMENT = '[API] TOPIC_POST_COMMENT';
export const FETCH_COMMENTS = '[API] TOPIC_FETCH_COMMENTS';

/* =========================================================
 * Internal Actions
 * ========================================================= */

const __init__ = createAction(INIT);
const __postComment__ = createAction(POST_COMMENT);
const __fetchComments__ = createAction(FETCH_COMMENTS);

/* =========================================================
 * Actions
 * ========================================================= */

export const init = id => dispatch => dispatch(__init__({
  path: `/api/v1/topics/${id}`,
}));

export const postComment = text => (dispatch, getState) => {
  const { id } = getState().topic.data;

  return dispatch(__postComment__({
    method: 'post',
    path: '/api/v1/comments',
    dist: 'postCommentData',
    status: 'postCommentStatus',
    params: { commentable: 'topic', commentableId: id, text },
  }));
};

export const fetchComments = id => dispatch => dispatch(__fetchComments__({
  path: '/api/v1/comments',
  dist: 'fetchCommentsData',
  status: 'fetchCommentsStatus',
  params: { commentable: 'topic', commentableId: id },
}));

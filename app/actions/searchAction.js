import { createAction } from 'redux-actions';

export const FETCH_TAGS = '[API] SEARCH_FETCH_TAGS';

/* =========================================================
 * Internal Actions
 * ========================================================= */

const __fetchTags__ = createAction(FETCH_TAGS);

/* =========================================================
 * Actions
 * ========================================================= */

export const fetchTags = () => dispatch => dispatch(__fetchTags__({
  path: '/api/v1/tags', dist: 'fetchTagsData', status: 'fetchTagsStatus',
}));

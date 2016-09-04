import { createAction } from 'redux-actions';

export const FETCH = '[API] EXPLORE_FETCH';
export const SELECT = '[API] EXPLORE_SELECT';

/* =========================================================
 * Internal Actions
 * ========================================================= */

const __fetch__ = createAction(FETCH);
const __select__ = createAction(SELECT);

/* =========================================================
 * Actions
 * ========================================================= */

export const fetch = () => dispatch => dispatch(__fetch__({
  path: '/api/v1/topics', status: 'fetchStatus', dist: 'fetch',
}));

export const select = item => dispatch => dispatch(__select__({
  path: `api/v1/topics/${item.itemMap.itemableId}/selections`,
  method: 'post',
  params: { itemId: item.id },
}));

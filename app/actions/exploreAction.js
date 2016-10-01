import { createAction } from 'redux-actions';

export const FETCH = '[API] EXPLORE_FETCH';
export const SELECT = '[API] EXPLORE_SELECT';
export const DESELECT = '[API] EXPLORE_DESELECT';

/* =========================================================
 * Internal Actions
 * ========================================================= */

const __fetch__ = createAction(FETCH);
const __select__ = createAction(SELECT);
const __deselect__ = createAction(DESELECT);

/* =========================================================
 * Actions
 * ========================================================= */

export const fetch = () => dispatch => dispatch(__fetch__({
  path: '/api/v1/topics',
  params: { withComments: true },
  dist: 'fetchData',
  status: 'fetchStatus',
}));

export const select = item => dispatch => dispatch(__select__({
  path: `/api/v1/topics/${item.itemMaps.itemableId}/selections`,
  method: 'post',
  params: { itemId: item.id },
  dist: 'selectData',
  status: 'selectStatus',
}));

export const deselect = item => dispatch => dispatch(__deselect__({
  path: `/api/v1/topics/${item.itemMaps.itemableId}/selections`,
  method: 'delete',
  dist: 'deselectData',
  status: 'deselectStatus',
  deselectedTopicId: item.itemMaps.itemableId,
}));

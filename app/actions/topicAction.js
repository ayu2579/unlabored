import { createAction } from 'redux-actions';

export const GET = '[API] TOPIC_GET';
export const SHOW = '[API] TOPIC_SHOW';
export const HIDE = '[API] TOPIC_HIDE';

/* =========================================================
 * Internal Actions
 * ========================================================= */

const __get__ = createAction(GET);

/* =========================================================
 * Actions
 * ========================================================= */

export const show = createAction(SHOW, () => ({ show: true }));
export const hide = createAction(HIDE, () => ({ show: false }));

export const get = id => dispatch => dispatch(__get__({
  path: `/api/v1/topics/${id}`,
}));

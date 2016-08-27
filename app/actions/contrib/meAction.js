import { createAction } from 'redux-actions';

export const GET = '[API] ME_GET';

/* =========================================================
 * Internal Actions
 * ========================================================= */

export const __get__ = createAction(GET);

/* =========================================================
 * Actions
 * ========================================================= */

export const get = () => dispatch => dispatch(__get__({ path: '/api/v1/me' }));

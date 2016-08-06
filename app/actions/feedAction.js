import { createAction } from 'redux-actions';

export const GET = '[API] GET';

/* =========================================================
 * Internal Actions
 * ========================================================= */

export const __get__ = createAction(GET);

/* =========================================================
 * Internal Actions
 * ========================================================= */

export const get = () => dispatch => dispatch(__get__());

import { createAction } from 'redux-actions';

export const FETCH = '[API] PROFILE_FETCH';

/* =========================================================
 * Internal Actions
 * ========================================================= */

const __fetch__ = createAction(FETCH);

/* =========================================================
 * Actions
 * ========================================================= */

export const fetch = () => dispatch => dispatch(__fetch__({ path: '/api/v1/notifications' }));

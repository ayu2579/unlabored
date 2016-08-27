import { createAction } from 'redux-actions';

export const SHOW = 'LOGIN_SHOW';
export const HIDE = 'LOGIN_HIDE';

/* =========================================================
 * Actions
 * ========================================================= */

export const show = createAction(SHOW, () => ({ show: true }));
export const hide = createAction(HIDE, () => ({ show: false }));

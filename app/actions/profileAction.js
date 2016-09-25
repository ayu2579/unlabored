import _ from 'lodash';
import { createAction } from 'redux-actions';

export const GET = '[API] PROFILE_GET';

/* =========================================================
 * Internal Actions
 * ========================================================= */

const __get__ = createAction(GET);

/* =========================================================
 * Actions
 * ========================================================= */

export const get = () => (dispatch, getState) => {
  const { me, routing } = getState();
  const { pathname, query } = routing.locationBeforeTransitions;
  const username = _.isEqual(pathname, '/profile') ? me.data.username : query.username;

  if (_.isEmpty(username)) { return; }

  // eslint-disable-next-line consistent-return
  return dispatch(__get__({ path: `/api/v1/users/${username}` }));
};

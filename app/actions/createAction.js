import _ from 'lodash';
import Promise from 'bluebird';
import { createAction } from 'redux-actions';

export const SHOW = 'CREATE_SHOW';
export const HIDE = 'CREATE_HIDE';
export const SAVE_ITEM = '[API] SHOW_SAVE_ITEM';
export const SAVE_TOPIC = '[API] SHOW_SAVE_TOPIC';

/* =========================================================
 * Internal Actions
 * ========================================================= */

const __saveItem__ = createAction(SAVE_ITEM);
const __saveTopic__ = createAction(SAVE_TOPIC);

/* =========================================================
 * Actions
 * ========================================================= */

export const show = createAction(SHOW, () => ({ show: true }));
export const hide = createAction(HIDE, () => ({ show: false }));

export const saveItem = (direction = 'left', { image, title, text }) => (dispatch, getState) => {
  const { id } = getState().create.items[direction] || {};

  return dispatch(__saveItem__({
    path: '/api/v1/items',
    method: 'post',
    params: { id, title, text },
    files: { image },
    dist: `${direction}Item`,
    status: `${direction}ItemStatus`,
  }));
};

export const saveTopic = ({ text }) => (dispatch, getState) => {
  const { leftItem, rightItem } = getState().create;

  if (_.isEmpty(leftItem) || _.isEmpty(rightItem)) {
    return Promise.props({ leftItem, rightItem, message: 'left or right item is empty.' });
  }

  const itemIds = `${leftItem.id},${rightItem.id}`;

  return dispatch(__saveTopic__({
    path: '/api/v1/topics',
    method: 'post',
    params: { itemIds, text },
    dist: 'saveTopic',
    status: 'saveTopicStatus',
  }));
};

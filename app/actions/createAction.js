import _ from 'lodash';
import Promise from 'bluebird';
import { createAction } from 'redux-actions';

export const SHOW = 'CREATE_SHOW';
export const HIDE = 'CREATE_HIDE';
export const SET_COLOR = 'SET_COLOR';
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
export const setColor = createAction(SET_COLOR, selectedColor => ({ selectedColor }));

export const saveItem = (direction = 'left', params) => (dispatch, getState) => {
  const { id } = getState().create[`${direction}Item`] || {};
  const image = params.image;

  delete params.image;

  return dispatch(__saveItem__({
    path: '/api/v1/items',
    method: 'post',
    params: _.assign({ id }, params),
    files: { image },
    dist: `${direction}Item`,
    status: `${direction}ItemStatus`,
  }));
};

export const saveTopic = params => (dispatch, getState) => {
  const { leftItem, rightItem } = getState().create;

  if (_.isEmpty(leftItem) || _.isEmpty(rightItem)) {
    return Promise.props({ leftItem, rightItem, message: 'left or right item is empty.' });
  }

  const itemIds = `${leftItem.id},${rightItem.id}`;

  return dispatch(__saveTopic__({
    path: '/api/v1/topics',
    method: 'post',
    params: _.assign({ itemIds }, params),
    dist: 'saveTopic',
    status: 'saveTopicStatus',
  }));
};

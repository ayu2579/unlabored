/* global FormData */

import _ from 'lodash';
import axios from 'axios';
import { contains } from 'underscore.string';

const api = store => next => action => {
  const { path } = _.get(action, 'payload', {});
  const actionWith = props => {
    const _action = _.cloneDeep(action);
    _action.payload = _.assign({}, action.payload, props);
    delete _action.payload.path;

    return _action;
  };

  // stop to current dispatch loop when removed path.
  if (!contains(action.type, 'API') || !_.has(action.payload, 'path')) {
    return next(action);
  }

  const dist = _.get(action.payload, 'dist', 'data');
  const files = _.get(action.payload, 'files');
  const source = _.get(action.payload, 'source');
  const status = _.get(action.payload, 'status', 'status');
  const method = _.toLower(_.get(action.payload, 'method', 'get'));
  let params = _.get(action.payload, 'params', {});
  const headers = _.get(action.payload, 'headers', {});

  const fullPath = path;

  /* eslint-disable no-param-reassign */
  delete action.payload.dist;
  delete action.payload.files;
  delete action.payload.source;
  delete action.payload.status;
  delete action.payload.params;
  delete action.payload.method;
  delete action.payload.headers;
  /* eslint-enable no-param-reassign */

  next(actionWith({ [status]: 'request' }));

  let data = {};

  if (!_.isEmpty(files)) {
    data = new FormData();

    _.forEach(params, (value, key) => {
      if (_.isUndefined(value) || _.isNull(value)) { return; }

      data.append(key, value);
    });

    params = {};

    if (_.isPlainObject(files)) {
      _.forEach(files, (file, key) => {
        if (_.isUndefined(file) || _.isNull(file)) { return; }

        data.append(key, file);
      });
    } else {
      data.append('files', files);
    }
  } else if (_.includes(['post', 'put'], method)) {
    _.forEach(params, (value, key) => {
      if (_.isUndefined(value) || _.isNull(value)) { return; }

      data[key] = value;
    });

    params = {};
  }

  const req = axios(fullPath, {
    method, headers, params, data,
  });

  return req.then(response => {
    const payload = { [status]: 'success' };
    const body = _.isEmpty(source) ? response.data : _.get(response.data, source);

    _.set(payload, dist, body);

    store.dispatch(actionWith(payload));

    return response;
  }).catch(error => {
    store.dispatch(actionWith({ [status]: 'failure', error }));

    return error;
  });
};

export default api;

import _ from 'lodash';
import { startsWith } from 'underscore.string';

export default () => (req, res, next) => {
  if (startsWith(req.url, '/api/')) {
    const { offset, limit } = req.query;

    req.query.limit = _.isNumber(limit) ? limit : 8;
    req.query.offset = _.isNumber(offset) ? offset : 0;
  }

  return next();
};

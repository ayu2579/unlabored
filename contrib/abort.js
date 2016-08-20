import _ from 'lodash';

const abort = (res, statusCode) => {
  let message = '';
  if (_.isEqual(statusCode, 404)) {
    message = 'The requested URL was not found.';
  } else if (_.isEqual(statusCode, 401)) {
    message = 'Access is denied due to invalid credentials.';
  }

  return res.status(statusCode).json({ message });
};

export default abort;

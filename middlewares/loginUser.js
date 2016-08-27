import _ from 'lodash';
import jwt from 'jsonwebtoken';
import cert from '../config/cert.json';
import { contains } from 'underscore.string';
import { User } from '../models';

export default () => (req, res, next) => {
  const { headers, cookies } = req;
  const token = headers.jwt || cookies.jwt;

  if (_.isEmpty(token)) { return next(); }
  if (contains(req.url, '/public/')) { return next(); }

  jwt.verify(token, cert.secret, (err, decoded) => {
    if (err) { return next(); }

    User.findOne({
      where: { id: decoded.id },
      attributes: ['id', 'nickname', 'username', 'email', 'fbId', 'createdAt', 'updatedAt'],
    })
    .then(user => {
      req.user = user;
      next();
    });
  });
};

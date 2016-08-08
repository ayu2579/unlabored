import _ from 'lodash';
import jwt from 'jsonwebtoken';
import cert from '../config/cert.json';
import { contains } from 'underscore.string';
import { User } from '../models';

export default () => (req, res, next) => {
  if (contains(req.url, '/public/')) { return next(); }
  if (_.isEmpty(req.cookies.jwt)) { return next(); }

  jwt.verify(req.cookies.jwt, cert.secret, (err, decoded) => {
    if (err) { return next(); }

    User.findOne({ where: { id: decoded.id } })
    .then(user => {
      req.user = user;
      next();
    });
  });
};

import _ from 'lodash';
import axios from 'axios';
import moment from 'moment';
import jwt from 'jsonwebtoken';
import { Router } from 'express';
import { User } from '../../models';
import cert from '../../config/cert.json';
import { appId, secret, scope } from '../../config/facebook.json';

/* eslint-disable new-cap */
const router = Router();
/* eslint-enable new-cap */

router.get('/facebook', (req, res) => {
  const { protocol, hostname, app } = req;
  const { port } = app.settings;
  let host = `${protocol}://${hostname}`;

  if (_.isEqual(port, 5000)) {
    host += `:${port}`;
  }

  res.redirect(`https://www.facebook.com/dialog/oauth?client_id=${appId}&display=popup&response_type=code&scope=${scope}&redirect_uri=${host}/api/v1/auth/facebook/callback`);
});

router.get('/facebook/callback', (req, res) => {
  const { protocol, hostname, app, query } = req;
  const { port } = app.settings;
  const { code } = query;
  let host = `${protocol}://${hostname}`;

  if (_.isEqual(port, 5000)) {
    host += `:${port}`;
  }

  axios.get('https://graph.facebook.com/v2.7/oauth/access_token', {
    params: {
      client_id: appId,
      client_secret: secret,
      redirect_uri: `${host}/api/v1/auth/facebook/callback`,
      code,
    },
  })
  .then(resOAuth => {
    const { access_token } = resOAuth.data;

    axios.get('https://graph.facebook.com/v2.7/me', {
      params: {
        fields: 'id,name,email',
        access_token,
        locale: 'ko_KR',
      },
    })
    .then(resMe => {
      const { id, name, email } = resMe.data;

      User.count({ where: { email } })
      .then(emailAlreadyTaken => {
        User.findOrCreate({ where: { fbId: id } })
        .spread(user => {
          user.fbId = id;
          user.fbAccessToken = access_token;

          if (_.isEmpty(user.username)) {
            user.username = name;
          }

          if (_.isEmpty(user.email) && !emailAlreadyTaken) {
            user.email = email;
          }

          user.save();

          jwt.sign(
            { id: user.id, email: user.email, username: user.username },
            cert.secret,
            { algorithm: 'HS256' },
            (err, token) => {
              res.cookie('jwt', token, {
                httpOnly: true,
                expires: moment().add(2, 'year').toDate(),
              }).redirect('/explore');
            }
          );
        });
      });

    });
  }).catch((error) => res.redirect('/explore'));
});

export default router;

import _ from 'lodash';

import { Router } from 'express';
import { abort } from '../../contrib';
import { Notification } from '../../models';

/* eslint-disable new-cap */
const router = Router();
/* eslint-enable new-cap */

router.get('/', (req, res) => {
  const { limit, offset } = req.query;

  if (_.isEmpty(req.user)) {
    abort(res, 401);
    return;
  }

  Notification.findAndCountAll({ limit, offset })
  .then(result => res.status(200).send(result));
});

export default router;

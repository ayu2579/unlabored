import _ from 'lodash';
import { Router } from 'express';
import { abort } from '../../contrib';

/* eslint-disable new-cap */
const router = Router();
/* eslint-enable new-cap */

router.get('/', (req, res) => {
  if (_.isEmpty(req.user)) {
    abort(res, 401);
    return;
  }

  res.status(200).json(req.user);
});

export default router;

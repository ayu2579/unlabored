import _ from 'lodash';
import Promise from 'bluebird';
import { Router } from 'express';
import { abort } from '../../contrib';
import { Topic, Selection } from '../../models';

/* eslint-disable new-cap */
const router = Router();
/* eslint-enable new-cap */

router.get('/', (req, res) => {
  if (_.isEmpty(req.user)) {
    abort(res, 401);
    return;
  }

  Promise.all([
    Topic.count({ where: { userId: req.user.id } }),
    Selection.count({ where: { userId: req.user.id } }),
  ])
  .spread((countOfTopic, countOfSelection) => {
    const result = _.assign({ countOfTopic, countOfSelection }, req.user.get({ plain: true }));
    res.status(200).json(result);
  });
});

export default router;

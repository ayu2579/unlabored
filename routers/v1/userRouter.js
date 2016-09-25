import _ from 'lodash';
import Promise from 'bluebird';
import { Router } from 'express';
import { abort } from '../../contrib';
import { User, Selection, Topic } from '../../models';

/* eslint-disable new-cap */
const router = Router();
/* eslint-enable new-cap */

router.get('/', (req, res) => {
  Promise.all([
    User.count(),
    User.findAll({
      attributes: ['id', 'username', 'nickname'],
    }),
  ]).spread((count, data) => {
    Promise.mapSeries(data, user => (
      Promise.all([
        Topic.count({
          where: { userId: user.id },
        }).then(countOfTopic => (user.dataValues.countOfTopic = countOfTopic)),
        Selection.count({
          where: { userId: user.id },
        }).then(countOfSelection => (user.dataValues.countOfSelection = countOfSelection)),
      ])
    ));
    res.status(200).json({ count, data });
  });
});

router.get('/:idOrUsername', (req, res) => {
  const { idOrUsername } = req.params || {};

  User.findOne({
    attributes: ['id', 'username', 'nickname'],
    where: {
      $or: [
        { id: idOrUsername },
        { username: idOrUsername },
      ],
    },
  }).then($user => {
    if (_.isEmpty($user)) {
      abort(res, 404);
      return;
    }

    res.status(200).json($user);
  });
});

export default router;

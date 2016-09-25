import _ from 'lodash';
import Promise from 'bluebird';
import { Router } from 'express';
import { abort } from '../../contrib';
import { sequelize, User, Comment } from '../../models';

/* eslint-disable new-cap */
const router = Router();
/* eslint-enable new-cap */

const defaultOptions = {
  attributes: ['id', 'text', 'createdAt'],
  order: [[sequelize.col('comments.createdAt'), 'DESC']],
  include: [
    {
      model: User,
      attributes: ['id', 'nickname', 'fbId'],
    },
  ],
};

router.get('/', (req, res) => {
  const { limit, offset } = req.query;
  const where = _.omit(req.query, ['limit', 'offset']);

  Promise.all([
    Comment.count(),
    // eslint-disable-next-line max-len
    Comment.findAll(_.assign({ limit, offset, where }, defaultOptions)),
  ]).spread((count, data) => res.status(200).json({ count, data }));
});

router.post('/', (req, res) => {
  const { id } = req.body || {};

  if (_.isEmpty(req.user)) {
    abort(res, 401);
    return;
  }

  const userId = req.user.get('id');

  if (!_.isEmpty(id)) {
    Comment.findById(id, defaultOptions).then($comment => {
      if (_.isEmpty($comment)) {
        abort(res, 404);
        return;
      }

      if (!_.isEqual($comment.userId, userId)) {
        abort(res, 401);
        return;
      }

      $comment.update(req.body, { fields: ['text'] })
      .then($$comment => res.status(201).json($$comment));
    });

    return;
  }

  Comment.create(
    _.assign(req.body, { userId }),
    { fields: ['userId', 'commentable', 'commentableId', 'text'] }
  ).then($comment => res.status(201).json($comment));
});

export default router;

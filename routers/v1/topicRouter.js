import _ from 'lodash';
import Promise from 'bluebird';
import { Router } from 'express';
import { abort } from '../../contrib';
import { Topic, Item, User, Image } from '../../models';

/* eslint-disable new-cap */
const router = Router();
/* eslint-enable new-cap */

const defaultOptions = {
  attributes: ['id', 'userId', 'title', 'text', 'type', 'createdAt'],
  include: [
    {
      model: User,
      attributes: ['id', 'username', 'fbId'],
    },
    {
      model: Item,
      attributes: ['id', 'text', 'createdAt'],
      include: [
        {
          model: Image,
          attributes: ['id', 'url', 'secureUrl', 'bytes', 'width', 'height', 'createdAt'],
        },
      ],
    },
  ],
};

router.get('/', (req, res) => {
  const { limit, offset } = req.query;
  Topic.findAndCountAll(_.assign({ limit, offset }, defaultOptions))
  .then(result => res.status(200).send(result))
  .catch(error => res.status(500).send(error));
});

router.get('/:id', (req, res) => {
  const { id } = req.params;

  Topic.findById(id, defaultOptions).then($topic => {
    if (_.isEmpty($topic)) {
      abort(res, 404);
      return;
    }

    res.status(200).send($topic);
  });
});

router.post('/', (req, res) => {
  const { id, itemIds } = req.body || {};

  if (_.isEmpty(req.user)) {
    abort(res, 401);
    return;
  }

  const userId = req.user.get('id');

  if (!_.isEmpty(id)) {
    Topic.findById(id, defaultOptions).then($topic => {
      if (_.isEmpty($topic)) {
        abort(res, 404);
        return;
      }

      if (!_.isEqual($topic.userId, userId)) {
        abort(res, 401);
        return;
      }

      $topic.update(req.body, { fields: ['title', 'text', 'type'] })
      .then(() => {
        Topic.findById(id, defaultOptions)
        .then($$topic => res.status(201).json($$topic));
      });
    });

    return;
  }

  Topic.create(
    _.assign(req.body, { userId }),
    { fields: ['title', 'text', 'type', 'userId'] }
  ).then($topic => {
    const $items = Item.findAll({ where: { id: { $in: itemIds.split(',') } } })
    .then($$items => $topic.addItem($$items));

    return Promise.all([$topic, $items]);
  }).spread($topic => {
    Topic.findById($topic.id, defaultOptions)
    .then($$topic => res.status(201).json($$topic));
  });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params || {};

  if (_.isEmpty(req.user)) {
    abort(res, 401);
    return;
  }

  const userId = req.user.get('id');

  Topic.findById(id)
  .then($topic => {
    if (!_.isEqual($topic.userId, userId)) {
      abort(res, 401);
      return;
    }

    $topic.destroy();
    res.status(204).json({ ok: true });
  });
});

export default router;

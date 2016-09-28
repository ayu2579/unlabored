import _ from 'lodash';
import Promise from 'bluebird';
import { Router } from 'express';
import { abort } from '../../contrib';
import {
  sequelize, Topic, Comment, Tag, Item, ItemMap,
  User, Image, Selection,
} from '../../models';

/* eslint-disable new-cap */
const router = Router();
const selectionRouter = Router({ mergeParams: true });
/* eslint-enable new-cap */

router.use('/:topicId/selections', selectionRouter);

const defaultOptions = {
  attributes: ['id', 'userId', 'title', 'text', 'color', 'kind', 'createdAt'],
  order: [[sequelize.col('topics.createdAt'), 'DESC']],
  include: [
    {
      model: User,
      attributes: ['id', 'nickname', 'fbId'],
    },
    {
      model: Tag,
      attributes: ['id', 'title'],
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
  const { limit, offset, withComments } = req.query;
  const userId = !_.isEmpty(req.user) ? req.user.get('id') : undefined;

  Topic.findAndCountAll(_.assign({ limit, offset }, defaultOptions))
  .then(({ count, rows }) => {
    Promise.mapSeries(rows, topic => {
      topic.dataValues.counts = {};

      return Promise.all([
        Selection.count({
          where: { topicId: topic.id },
        }).then(selection => (topic.dataValues.counts.selection = selection)),
        Selection.findOne({
          where: { userId, topicId: topic.id },
        }).then(selection => (topic.dataValues.selection = selection)),
        withComments && Comment.count({
          where: { commentableId: topic.id, commentable: 'topic' },
        }).then(comment => (topic.dataValues.counts.comment = comment)),
        withComments && Comment.findAll({
          limit: 3,
          order: [[sequelize.col('comments.createdAt'), 'DESC']],
          where: { commentableId: topic.id, commentable: 'topic' },
          attributes: ['id', 'text', 'createdAt'],
          include: [
            {
              model: User,
              attributes: ['id', 'nickname', 'fbId'],
            },
          ],
        }).then(comments => (topic.dataValues.comments = comments)),
      ]);
    }).then(() => res.status(200).json({ count, rows }));
  });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const userId = !_.isEmpty(req.user) ? req.user.get('id') : undefined;

  Promise.all([
    Topic.findById(id, defaultOptions),
    Selection.count({ where: { topicId: id } }),
    _.isUndefined(userId) ? Selection.findOne({ where: { userId, topicId: id } }) : undefined,
    Comment.count({ where: { commentableId: id, commentable: 'topic' } }),
  ]).spread(($topic, selection, $selection, comment) => {
    if (_.isEmpty($topic)) {
      abort(res, 404);
      return;
    }

    $topic.dataValues.selection = $selection;
    $topic.dataValues.counts = { selection, comment };
    res.status(200).send($topic);
  });
});

router.post('/', (req, res) => {
  const { id, itemIds, tags } = req.body || {};

  if (_.isEmpty(req.user)) {
    abort(res, 401);
    return;
  }

  const userId = req.user.get('id');

  const titles = tags.replace(/#/g, '').replace(/\s{2}/g, ' ');
  Promise.all([
    Item.findAll({ where: { id: { $in: itemIds.split(',') } } }),
    Promise.mapSeries(titles.split(' '), title =>
      Tag.findOrCreate({ where: { title }, defaults: { userId } }).spread(tag => tag)
    ),
  ]).spread(($items, $tags) => {
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

        Promise.all([
          $topic.update(req.body, { fields: ['title', 'text', 'color', 'kind'] }),
          $topic.setTags($tags),
          $topic.setItems($items),
        ]).spread(() => {
          Topic.findById(id, defaultOptions)
          .then($$topic => res.status(201).json($$topic));
        });
      });

      return;
    }

    Topic.create(
      _.assign(req.body, { userId }),
      { fields: ['userId', 'title', 'text', 'color', 'kind'] }
    )
    .then($topic => Promise.all([
      $topic, $topic.setItems($items), $topic.setTags($tags),
    ]))
    .spread($topic => {
      Topic.findById($topic.id, defaultOptions)
      .then($$topic => res.status(201).json($$topic));
    });
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

// Selection Route

selectionRouter.post('/', (req, res) => {
  if (_.isEmpty(req.user)) {
    abort(res, 401);
    return;
  }

  const { topicId } = req.params;
  const itemId = _.toInteger(req.body.itemId);
  const userId = req.user.get('id');

  Selection.findOne({ where: { userId, topicId } })
  .then($selection => {
    if (_.isEmpty($selection)) {
      Promise.all([
        Selection.create({ userId, itemId, topicId }),
        ItemMap.findOne({ where: { itemId, itemableId: topicId, itemable: 'topic' } })
        .then($itemMap => $itemMap.increment('count', { by: 1 })),
      ])
      .spread($$selection => res.status(201).json($$selection));

      return;
    }

    $selection.update({ itemId }).then(() => res.status(201).json($selection));
  });
});

selectionRouter.delete('/', (req, res) => {
  if (_.isEmpty(req.user)) {
    abort(res, 401);
    return;
  }

  const { topicId } = req.params;
  const userId = req.user.get('id');

  Selection.findOne({ where: { userId, topicId } })
  .then($selection => {
    if (!_.isEmpty($selection)) {
      $selection.destroy();
    }

    res.status(204).json({ ok: true });
  });
});

export default router;

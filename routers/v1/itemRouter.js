import _ from 'lodash';
import path from 'path';
import humps from 'humps';
import multer from 'multer';
import Datauri from 'datauri';
import Promise from 'bluebird';
import { Router } from 'express';
import { abort, cloudinary } from '../../contrib';
import { Item, Image } from '../../models';

/* eslint-disable new-cap */
const router = Router();
/* eslint-enable new-cap */

const defaultOptions = {
  attributes: ['id', 'userId', 'text', 'kind', 'createdAt'],
  include: [
    {
      model: Image,
      attributes: ['id', 'url', 'secureUrl', 'bytes', 'width', 'height', 'createdAt'],
    },
  ],
  order: [
    [Image, 'createdAt', 'DESC'],
  ],
};

router.get('/:id', (req, res) => {
  const { id } = req.params;

  Item.findById(id, defaultOptions).then($item => {
    if (_.isEmpty($item)) {
      abort(res, 404);
      return;
    }

    res.status(200).json($item);
  });
});

const storage = multer.memoryStorage();
const multipart = multer({ storage });
router.post('/', multipart.single('image'), (req, res) => {
  const { id } = req.body || {};

  if (_.isEmpty(req.user)) {
    abort(res, 401);
    return;
  }

  const userId = req.user.get('id');

  if (!_.isEmpty(id)) {
    Item.findById(id, defaultOptions).then($item => {
      if (_.isEmpty($item)) {
        abort(res, 404);
        return;
      }

      if (!_.isEqual($item.userId, userId)) {
        abort(res, 401);
        return;
      }

      if (!_.isEmpty(req.file) || !_.isEmpty(req.body)) {
        $item.update(req.body, { fields: ['text', 'kind'] })
        .then(() => {
          if (!_.isEmpty(req.file)) {
            const dUri = new Datauri();
            dUri.format(path.extname(req.file.originalname).toString(), req.file.buffer);
            cloudinary.uploader.upload(dUri.content, result => {
              Image.create(_.assign(humps.camelizeKeys(result), { userId }))
              .then($image => {
                $item.getImages()
                .then($images => Promise.map($images, $$image => $$image.destroy()))
                .then(() => {
                  $item.addImage($image).then(() => {
                    Item.findById($item.id, defaultOptions)
                    .then($$item => res.status(201).json($$item));
                  });
                });
              });
            });

            return;
          }

          Item.findById($item.id, defaultOptions)
          .then($$item => res.status(201).json($$item));
        });

        return;
      }

      res.status(201).json($item);
    });

    return;
  }

  if (_.isEmpty(req.file)) {
    Item.create(
      _.assign(req.body, { userId }),
      { fields: ['userId', 'text', 'kind'] }
    ).then($item => {
      Item.findById($item.id, defaultOptions)
      .then($$item => res.status(201).json($$item));
    });

    return;
  }

  const dUri = new Datauri();
  dUri.format(path.extname(req.file.originalname).toString(), req.file.buffer);
  cloudinary.uploader.upload(dUri.content, result => {
    Image.create(_.assign(humps.camelizeKeys(result), { userId }))
    .then($image => {
      Item.create(
        _.assign(req.body, { userId }),
        { fields: ['text', 'image', 'userId'] }
      ).then($item => $item.addImage($image).then(() => {
        Item.findById($item.id, defaultOptions).then($$item => res.status(201).json($$item));
      }));
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

  Item.findById(id)
  .then($item => {
    if (!_.isEqual($item.userId, userId)) {
      abort(res, 401);
      return;
    }

    $item.destroy();
    res.status(204).json({ ok: true });
  });
});

export default router;

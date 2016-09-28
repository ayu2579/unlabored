import Promise from 'bluebird';
import { Router } from 'express';
import { Tag } from '../../models';

/* eslint-disable new-cap */
const router = Router();
/* eslint-enable new-cap */

router.get('/', (req, res) => {
  const { limit, offset } = req.query;

  Tag.findAndCountAll({ limit, offset })
  .then(result => res.status(200).send(result));
});

export default router;

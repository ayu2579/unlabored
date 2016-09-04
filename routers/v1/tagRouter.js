import { Router } from 'express';
import { Tag } from '../../models';

/* eslint-disable new-cap */
const router = Router();
/* eslint-enable new-cap */

router.get('/', (req, res) => {
  Tag.findAll()
  .then(result => res.status(200).send(result));
});

export default router;

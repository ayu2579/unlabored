import { Router } from 'express';
import { User } from '../../models';

/* eslint-disable new-cap */
const router = Router();
/* eslint-enable new-cap */

router.get('/', (req, res) => {
  User.findAndCoundAll()
  .then(result => res.status(200).send(result));
});

export default router;

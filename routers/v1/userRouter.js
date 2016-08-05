import { Router } from 'express';

/* eslint-disable new-cap */
const router = Router();
/* eslint-enable new-cap */

router.get('/', (req, res) => {
  res.json({ message: 'user success' });
});

export default router;

import express from 'express';

import emojis from './emojis';

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'API V1 SeriesHub',
  });
});

router.use(emojis);

export default router;

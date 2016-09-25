import * as v1 from './v1';

export default app => {
  app.use('/api/v1/me', v1.meRouter);
  app.use('/api/v1/tags', v1.tagRouter);
  app.use('/api/v1/auth', v1.authRouter);
  app.use('/api/v1/users', v1.userRouter);
  app.use('/api/v1/items', v1.itemRouter);
  app.use('/api/v1/topics', v1.topicRouter);
  app.use('/api/v1/comments', v1.commentRouter);
};

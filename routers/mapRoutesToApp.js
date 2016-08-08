import * as v1 from './v1';

export default app => {
  app.use('/api/v1/auth', v1.authRouter);
  app.use('/api/v1/users', v1.userRouter);
  app.use('/api/v1/products', v1.productRouter);
};

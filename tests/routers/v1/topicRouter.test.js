import { app } from '../../..';
import { sequelize, Product } from '../../../models';
import request from 'supertest';

describe('topicRouter', () => {
  afterEach(() => sequelize.sync({ force: true }));
  beforeEach(() => sequelize.sync({ force: true }));

  describe('[GET] /v1/topics/:id', () => {
    it('should not found topic', done => {
      request(app)
      .get('/api/v1/topics/1')
      .expect(404)
      .end((err, res) => done(err));
    });

    it('should return topic', done => {
      Product.create().then(product => {
        request(app)
        .get(`/api/v1/topics/${product.id}`)
        .expect(200)
        .end((err, res) => done(err));
      });
    });
  });

  describe('[POST] /v1/topics', () => {
    it('should return topics', done => {
      request(app)
      .post('/api/v1/topics')
      .send({ title: 'title' })
      .expect(201)
      .end((err, res) => done(err));
    });
  });
});

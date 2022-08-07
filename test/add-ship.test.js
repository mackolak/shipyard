const { buildFastify, expect, request, sandbox } = require('./testHelper');

const ships = require('../lib/mongo-client');
const Ship = require('../app/models/ship');

describe('Add new ship', () => {
  describe('POST `/ships` route', () => {
    let fastify;

    beforeEach(async () => {
      fastify = buildFastify();
      await Ship.removeAll();
    });

    afterEach(() => {
      fastify.close();
      sandbox.restore();
    });

    context('when valid data', () => {
      it('responds with 201 and ship properties', async () => {
        const _id = '62ef826ded73f241fba3750b';

        await fastify.ready();

        const response = await request(fastify.server)
          .post('/v1/ships')
          .send({
            _id,
            name: 'Titanic',
            speed: 'slow',
          })
          .expect(201)
          .expect('Content-Type', 'application/json; charset=utf-8');

        expect(response.body).to.deep.equal({
          _id,
          name: 'Titanic',
          speed: 'slow',
        });
      });
    });

    context('when error', () => {
      context('when invalid input', () => {
        it('throws Bad request error', async () => {
          await fastify.ready();

          await request(fastify.server)
            .post('/v1/ships')
            .send({
              height: '86',
              width: '10',
            })
            .expect(400);
        });
      });

      context('when database returns error', () => {
        it('throws Internal server error', async () => {
          sandbox.stub(ships, 'insertOne').throws(new Error('test db error'));

          await fastify.ready();

          await request(fastify.server)
            .post('/v1/ships')
            .send({
              name: 'Titanic',
              speed: 'slow',
            })
            .expect(500);
        });
      });
    });
  });
});

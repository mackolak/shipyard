const { buildFastify, expect, request, sandbox } = require('./testHelper');

const Ship = require('../app/models/ship');

describe('Get ships', () => {
  describe('GET `/ships` route', () => {
    let fastify;

    beforeEach(async () => {
      fastify = buildFastify();
      await Ship.removeAll();
    });

    afterEach(() => {
      fastify.close();
      sandbox.restore;
    });

    context('when valid data', () => {
      it('responds with 201 and ship properties', async () => {
        const ship1 = new Ship({
          _id: '62ef826ded73f241fba3750c',
          name: 'USS Enterprise',
          speed: '62.2 km/h',
        });
        const ship2 = new Ship({
          _id: '72ef826ded73f241fba3750d',
          name: 'Queen Victoria',
          speed: '33 km/h',
        });

        await Promise.all([ship1.save(), ship2.save(), fastify.ready()]);

        const response = await request(fastify.server)
          .get('/v1/ships')
          .expect(200)
          .expect('Content-Type', 'application/json; charset=utf-8');

        expect(response.body).to.be.an('array');

        const [firstShip, secondShip] = response.body;

        expect(firstShip).to.eql({
          _id: '62ef826ded73f241fba3750c',
          name: 'USS Enterprise',
          speed: '62.2 km/h',
        });

        expect(secondShip).to.eql({
          _id: '72ef826ded73f241fba3750d',
          name: 'Queen Victoria',
          speed: '33 km/h',
        });
      });
    });

    context('when error', () => {
      context('when db is not responding', () => {
        it('throws Bad request error', async () => {
          sandbox
            .stub(Ship, 'getAll')
            .throws(new Error('Db is not responding'));
          await fastify.ready();

          await request(fastify.server).get('/v1/ships').expect(500);
        });
      });
    });
  });
});

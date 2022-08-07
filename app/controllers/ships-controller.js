const ShipService = require('../services/ship-service');

const shipSchema = {
  type: 'object',
  properties: {
    _id: { type: 'string' },
    name: { type: 'string' },
    speed: { type: 'string' },
  },
  required: ['name', 'speed'],
  additionalProperties: false,
};

function shipsController(fastify, opts, done) {
  fastify.route({
    method: 'GET',
    url: '/ships',
    schema: {
      response: {
        200: {
          type: 'array',
          items: {
            type: 'object',
            properties: shipSchema.properties,
          },
        },
      },
    },
    handler: async function (request, reply) {
      const ships = await ShipService.getShips();
      reply.send(ships);
    },
  });
  fastify.route({
    method: 'POST',
    url: '/ships',
    schema: {
      response: {
        201: {
          type: 'object',
          properties: shipSchema.properties,
        },
      },
      body: shipSchema,
    },
    handler: async function (request, reply) {
      const ships = await ShipService.addShip(request.body);
      reply.code(201).send(ships);
    },
  });
  done();
}

module.exports = shipsController;

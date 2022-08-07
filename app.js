const fastify = require('fastify');
const shipsController = require('./app/controllers/ships-controller');

function build(opts = {}) {
  const app = fastify(opts);

  app.register(shipsController, {
    prefix: '/v1',
  });

  return app;
}

module.exports = build;

const server = require('./app');
const swaggerConfig = require('./app/config/swagger');

const start = async () => {
  try {
    const fastify = server();
    fastify.register(require('@fastify/swagger'), swaggerConfig.options);
    await fastify.listen({ port: 4200 }, (err, address) => {
      if (err) {
        server.log.error(err);
        process.exit(1);
      }
    });
    // fastify/swagger is not loading the routes into documentation - TBD
    // fastify.swagger();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};
start();

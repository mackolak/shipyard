const server = require('./app');

const start = async () => {
  try {
    const fastify = server();
    await fastify.listen({ port: 4200 }, (err, address) => {
      if (err) {
        server.log.error(err);
        process.exit(1);
      }
    });
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};
start();

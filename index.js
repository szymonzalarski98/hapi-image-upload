'use strict';

const Hapi = require('@hapi/hapi');
const Inert = require('inert');
const routes = require('./routes/index'); 

const init= async () => {
  const server = Hapi.server({
    port: 3001,
    host: 'localhost'
  });
  await server.register(Inert);
  server.route(routes);
  await server.start();
  console.log(`Server running on port: ${server.info.uri}`);
}

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

init();

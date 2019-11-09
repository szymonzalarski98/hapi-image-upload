'use strict';

const Hapi = require('@hapi/hapi');
const Inert = require('inert');
const fs = require('fs');
const routes = require('./routes/index'); 

const init= async () => {
  const server = Hapi.server({
    port: 3001,
    host: 'localhost'
  });
  server.route(routes);
  await server.register(Inert);
  // server.route({
  //   method: 'GET',
  //   path: '/',
  //   handler: (req, h) => 'hello world!'
  // });
  // server.route({
  //   method: 'GET',
  //   path: '/upload/{file*}',
  //   handler: {
  //     directory: {
  //       path: 'upload'
  //     }
  //   }
  // });
  // server.route({
  //   method: 'POST',
  //   path: '/upload',
  //   options: {
  //     payload: {
  //       output: 'stream'
  //     }
  //   },
  //   handler: (req, h) => {
  //     const { payload } = req;
  //     const response = handleFileUpload(payload.file);
  //     return response;
  //   }
  // })
  await server.start();
  console.log(`Server running on port: ${server.info.uri}`);
}

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

init();

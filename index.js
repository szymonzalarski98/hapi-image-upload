'use strict';

const Hapi = require('hapi');
const Inert = require('inert');
const routes = require('./routes/index'); 
const mongoose = require('mongoose');
const mongoDbUri = 'mongodb://localhost:27017/hapi-db';

mongoose.connect(mongoDbUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
  console.log(`App is connected to ${mongoDbUri}`);
});

mongoose.connection.on('error', (err) => {
  console.log('Error while connecting to mongodb', err);
});

const server = new Hapi.Server({
  host: 'localhost',
  port: 3001,
});

const init = async () => {
  await server.register(Inert);
  server.route(routes);
  await server.start();
}

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

init();

// const server = Hapi.server({
//   port: 3001,
//   host: 'localhost'
// });


// const init= async () => {
//   await server.register(Inert);
//   server.route(routes);
//   await server.start();
//   console.log(`Server running on port: ${server.info.uri}`);
// }

// process.on('unhandledRejection', (err) => {
//   console.log(err);
//   process.exit(1);
// });

// init();

// module.exports = server;

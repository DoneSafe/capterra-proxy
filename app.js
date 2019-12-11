const express = require('express');
const debug = require('debug')('mavenlink-proxy:server');
const http = require('http');
const proxyFactory = require('./proxy-factory');

const app = express();

app.use('/clicks', proxyFactory('clicks'));

app.get('/_health_check', (req, res, next) => res.status(200).json({ message: 'ok' }));

const { PORT = '4000' } = process.env;

app.set('port', PORT);

const server = http.createServer(app);

server.listen(PORT);
server.on('error', onError);
server.on('listening', onListening);


function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}

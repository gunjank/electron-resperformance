var cc = require('config-multipaas'),
  Hapi = require('hapi'),
  path = require('path'),
  benchMark = require('./benchmark.module');
var config = cc()
var server = Hapi.createServer(config.get('IP'), config.get('PORT'), {
  cors: true,
  files: { relativeTo: path.resolve('.', './app/public') }
});
console.log("inside server .js ")

// Routes
server.route({
  method: 'GET',
  path: '/status',
  handler: function (request, reply) {
    reply({ "status": "ok" })
  }
});

server.route({
  method: 'POST',
  path: '/v1/benchMark',
  config: {
    handler: benchMark.callBenchMark

  }
});

server.route({
  method: 'GET',
  path: '/{param*}',
  handler: { directory: { path: '.' } } // relativeTo: '/static/'
});

server.start(function () {
  console.log('Server started at: ' + server.info.uri);
});

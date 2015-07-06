var _ = require('underscore');
var cookieParser = require('cookie-parser');
var nconf = require('nconf');
var parseCookie = cookieParser(nconf.get('SESSION_SECRET'));


exports.setupClientWebsocket = function (app) {
  var wss = app.get('wss');

  wss.on('connection', function (client) {
    client.send(JSON.stringify({
      msg: 'Socket Opened'
    }));
    parseCookie(client.upgradeReq, null, function (err) {
      var sessionID = client.upgradeReq.signedCookies['connect.sid'];
      var store = app.get('store');
      store.get(sessionID, function (e, session) {
        client.user_id = session.user_id;
      });
    });
  });


  wss.sendEvent = function (data) {
    if(data && data.user && data.user.id) {
      var clients = _.filter(this.clients, function (c) {
        return c.user_id == data.user.id;
      });
      clients.forEach(function (client) {
        client.send(JSON.stringify(data));
      });
    }
  };
};

const _ = require('underscore');
const cookieParser = require('cookie-parser');
const nconf = require('nconf');
const parseCookie = cookieParser(nconf.get('SESSION_SECRET'));


exports.setupClientWebsocket =  (app) => {
  const wss = app.get('wss');

  wss.on('connection', (client) => {
    client.send(JSON.stringify({
      msg: 'Socket Opened'
    }));
    parseCookie(client.upgradeReq, null, () => {
      const sessionID = client.upgradeReq.signedCookies['connect.sid'];
      const store = app.get('store');
      store.get(sessionID, (e, session) => {
        if(e) {
          console.error(e);
        }
        client.user_id = session.user_id;
      });
    });
  });


  wss.sendEvent = function(data) {
    if (data && data.user && data.user.id) {
      const clients = _.filter(this.clients, (c) => {
        return c.user_id === data.user.v2_id;
      });
      clients.forEach((client) => {
        client.send(JSON.stringify(data));
      });
    } else {
      console.error('Invalid webhook format receieved');
    }
  };
};

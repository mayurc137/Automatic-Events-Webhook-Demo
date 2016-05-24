const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MemoryStore = session.MemoryStore;
const store = new MemoryStore();
const nconf = require('nconf');

const app = express();

app.set('store', store);

// view engine setup
app.set('views', __dirname + '/views');
app.set('view engine', 'pug');

app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser(nconf.get('SESSION_SECRET')));
app.use(session({
  store: store,
  secret: nconf.get('SESSION_SECRET'),
  saveUninitialized: true,
  resave: true,
  cookie: {
    maxAge: 31536000000
  }
}));
app.use(express.static(path.join(__dirname, 'public')));


// Routes
const routes = require('./routes');
const oauth = require('./routes/oauth');

if (app.get('env') !== 'development') {
  // Force HTTPS in production
  app.all('*', routes.force_https);
} else {
  // Allow `USER_ID=<YOUR_USER_ID> TOKEN=<YOUR-AUTOMATIC-ACCESS-TOKEN> gulp develop` when runinning locally
  app.all('*', routes.check_dev_token);
}


app.get('/', oauth.ensureAuthenticated, routes.index);
app.get('/login', routes.login);

app.get('/authorize/', oauth.authorize);
app.get('/logout/', oauth.logout);
app.get('/redirect/', oauth.redirect);


// Handle Incoming webhooks
app.post('/webhook/', (req, res) => {
  console.log('Incoming Webhook: ' + JSON.stringify(req.body));
  if (req.body) {
    const wss = app.get('wss');
    wss.sendEvent(req.body);
    res.json({success: true});
  }
});

// error handlers
require('./libs/errors')(app);

module.exports = app;

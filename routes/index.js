var nconf = require('nconf');


exports.index = function (req, res, next) {
  res.render('index', {
    mapboxAccessToken: nconf.get('MAPBOX_ACCESS_TOKEN'),
    loggedIn: true
  });
};


exports.login = function (req, res, next) {
  res.render('login');
};


exports.force_https = function (req, res, next) {
  if(req.headers['x-forwarded-proto'] != 'https') {
    res.redirect('https://' + req.headers.host + req.path);
  } else {
    next();
  }
};


exports.check_dev_token = function (req, res, next) {
  if(process.env.TOKEN) {
    req.session.access_token = process.env.TOKEN;
    req.session.user_id = process.env.USER_ID;
  }
  next();
};

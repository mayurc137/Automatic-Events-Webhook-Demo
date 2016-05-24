const nconf = require('nconf');


exports.index = (req, res, next) => {
  res.render('index', {
    loggedIn: true
  });
};


exports.login = (req, res, next) => {
  res.render('login');
};


exports.force_https = (req, res, next) => {
  if (req.headers['x-forwarded-proto'] !== 'https') {
    res.redirect('https://' + req.headers.host + req.path);
  } else {
    next();
  }
};


exports.check_dev_token = (req, res, next) => {
  if (process.env.TOKEN) {
    req.session.access_token = process.env.TOKEN;
    req.session.user_id = process.env.USER_ID;
  }
  next();
};

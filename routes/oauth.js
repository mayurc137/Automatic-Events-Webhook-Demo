var nconf = require('nconf');
var request = require('request');

var oauth2 = require('simple-oauth2')({
  clientID: nconf.get('AUTOMATIC_CLIENT_ID'),
  clientSecret: nconf.get('AUTOMATIC_CLIENT_SECRET'),
  site: nconf.get('AUTOMATIC_ACCOUNTS_URL'),
  tokenPath: '/oauth/access_token'
});

var authorization_uri = oauth2.authCode.authorizeURL({
  scope: 'scope:user:profile scope:trip scope:location scope:vehicle:profile scope:vehicle:events scope:behavior'
});


exports.authorize = function (req, res, next) {
  res.redirect(authorization_uri);
};


exports.redirect = function (req, res, next) {
  var code = req.query.code;

  oauth2.authCode.getToken({
    code: code
  }, function (e, result) {
    if (e) return next(e);

    // Attach `token` to the user's session for later use
    var token = oauth2.accessToken.create(result);

    req.session.access_token = token.token.access_token;

    // Get Automatic user id
    request.get({
      uri: nconf.get('AUTOMATIC_API_URL') + '/user/me/',
      headers: {Authorization: 'bearer ' + req.session.access_token},
      json: true
    }, function(e, r, body) {
      if (e) return next(e);

      req.session.user_id = body.id;
      res.redirect('/');
    });
  });
};


exports.ensureAuthenticated = function (req, res, next) {
  if (req.session && req.session.access_token) {
    return next();
  }

  if (req.xhr) {
    var error = new Error('Not logged in');
    error.setStatus(401);
    return next(error);
  } else {
    res.redirect('/login');
  }
};


exports.logout = function (req, res, next) {
  req.session.destroy();
  res.redirect('/');
};

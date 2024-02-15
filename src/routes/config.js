import path from 'path'
const axios = require('axios');
const qs = require('querystring');

function requireLogin(req, res, next) {
  if (req.session && req.session.userId) {
    next();
  } else {
    res.redirect('/login');
  }
}

function serveProtectedPage(pagePath) {
  return function (req, res, next) {
    if (req.session && req.session.userId) {
      res.sendFile(path.join(__dirname, pagePath));
    } else {
      res.redirect('/login');
    }
  };
}

function servePage(pagePath) {
  return function (req, res) {
    res.sendFile(path.join(__dirname, pagePath));
  };
}

function redirectIfLoggedIn(req, res, next) {
  if (req.session && req.session.userId) {
    res.redirect('/dashboard');
  } else {
    next();
  }
}

function requireResetToken(req, res, next) {
  const { token } = req.query;

  if (token) {
    next();
  } else {
    res.redirect('/home');
  }
}


async function validateCaptcha(request, response, next) {
  try {
    const token = request.body['cf-turnstile-response'];
    const ip = request.headers['cf-connecting-ip'];

    const formData = qs.stringify({
      secret: '0x4AAAAAAARzTZUDQBBfwVM1ZGN8vxUvkvg',
      response: token,
      remoteip: ip
    });

    const config = {
      method: 'post',
      url: 'https://challenges.cloudflare.com/turnstile/v0/siteverify',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: formData
    };

    const result = await axios(config);
    const outcome = result.data;

    if (outcome.success) {
      next(); 
    } else {
      response.status(403).send('Captcha validation failed');
    }
  } catch (error) {
    console.error(error); 
    response.status(500).send('An error occurred while validating the captcha');
  }
}


module.exports = { requireLogin, serveProtectedPage, servePage, redirectIfLoggedIn, requireResetToken, validateCaptcha };

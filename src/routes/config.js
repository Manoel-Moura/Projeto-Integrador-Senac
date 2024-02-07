import path from 'path'
function requireLogin(req, res, next) {
    if (req.session && req.session.userId) {
        next();
    } else {
        res.redirect('/login');
    }
}

function serveProtectedPage(pagePath) {
    return function(req, res, next) {
        if (req.session && req.session.userId) {
            res.sendFile(path.join(__dirname, pagePath));
        } else {
            res.redirect('/login');
        }
    };
}

function servePage(pagePath) {
    return function(req, res) {
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

module.exports = { requireLogin, serveProtectedPage, servePage, redirectIfLoggedIn, requireResetToken };

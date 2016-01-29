// app/routes.js
module.exports = function(app, passport) {
  // home page with login links
  app.get('/', function(req, res) {
    res.render('index.ejs'); // load the index.ejs file
  });

  // show the login form
  app.get('/login', function(req, res) {
    // render the page and pass-in any flash data if exists
    res.render('login.ejs', { message: req.flash('loginMessage') });
  });

  // process the login form
  // do all our passport stuff here
  // app.post('/login', etc);

  // show signup form
  app.get('/signup', function(req, res) {
    // render page and pass-in any flasj data if exists
    res.render('signup.ejs', { message: req.flash('signupMessage') });
  });

  // process the signup form
  // app.post('/signup', etc);

  // profile section
  // we'll protect this page, so only logged in visitor can access
  // will use route middleware to verify this (isLoggedIn func.
  app.get('/profile', isLoggedIn, function(req, res) {
    res.render('profile.ejs', {
      user : req.user // get the user out of session and pass to template
    });
  });

  // logout
  app.get('/logout', function(req, res) {
    req.logout();
    req.redirect('/');
  });
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
  // if user is authenticated in the session, carry on
  if (req.isAuthenticated())
    return next();
  // if they are not, then redirect them to home page
  res.redirect('/');
}



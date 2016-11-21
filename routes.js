module.exports = function(app, passport){

  // Render homepage
  app.get('/', function(req, res){
    res.render('index.ejs');
  });

  // Render login page
  app.get('/login', function(req, res){
    res.render('login.ejs', { message: req.flash('loginMessage') });
  });

  // Process the login form 
  app.post('/login', passport.authenticate('local-login', {
    successRedirect : '/profile',
    failureRedirect : 'login',
    failureFlash : true
  }));

  // Render the signup page
  app.get('/signup', function(req, res){
    res.render('signup.ejs', { message: req.flash('signupMessage') });
  });

  // Process signup form
  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect : '/profile', 
    failureRedirect : '/signup',
    failureFlash : true
  }));

  // Render the users profile page
  // Need to protect this
  app.get('/profile', isLoggedIn, function(req, res){
    res.render('profile.ejs', {
      user : req.user // get the user out of the session and pass to template
    });
  });

  // Logout
  app.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
  });

  // Error route
  app.get('/error', function(req, res){
      res.render('error.ejs');
  });

  // function to check if user is logged in or not
  function isLoggedIn(req, res, next){
    if (req.isAuthenticated()){
      return next();
    }
    res.redirct('/');
  }
}
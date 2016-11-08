module.exports = function(app, passport){

  // Render homepage
  app.get('/', function(req, res){
    res.render('index.jade');
  });

  // Render login page
  app.get('/login', function(req, res){
    res.render('login.jade', { messages: req.flash('loginMessage') });
  });

  // Process the login form 
  // app.post('login', passport stuff);

  // Render the signup page
  app.get('signup', function(req, res){
    res.render('signup.jade', { message: req.flash('signupMessage') });
  });

  // Process signup form
  // app.post('signup', passport stuff);

  // Render the users profile page
  // Need to protect this
  app.get('profile', isLoggedIn, function(req, res){
    res.render('profile.jade', {
      user : req.user // get the user out of the session and pass to template
    });
  });

  // Logout
  app.get('logout', function(req, res){
    req.logout();
    res.redirect('/');
  });

  // function to check if user is logged in or not
  function isLoggedIn(req, res, next){
    if (req.isAuthenticated()){
      return next();
    }
    res.redirct('/');
  }



}
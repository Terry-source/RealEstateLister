var express = require('express');
var router = express.Router();
const passport = require("passport");

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

// Google OAuth login route
router.get(
  "/auth/google",
  // `passport.authenticate` returns a middleware function that coordiantes with the OAuth server
  // The user will see the OAuth consent screen if they haven't previously consented
  passport.authenticate(
    // Name of strategy being used
    "google",
    {
      // Requesting the user's profile and email
      scope: ["profile", "email"],
      // Optionally force pick account every time
      // prompt: "select_account"
    }
  )
);

// Google OAuth callback route
router.get(
  "/oauth2callback",
  passport.authenticate("google", {
    // redirect to main /movies page on both success and failure
    successRedirect: "/",
    failureRedirect: "/",
  })
);

// OAuth logout route
router.get("/logout", function (req, res) {
  // `logout` method added to `req` by Passport
  req.logout(function () {
    res.redirect("/");
  });
});

module.exports = router;

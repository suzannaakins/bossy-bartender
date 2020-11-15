const router = require('express').Router();
const sequelize = require('../config/connection');

router.get('/', (req, res) => {
    res.render('homepage')
});

router.get('/cocktails', (req, res) => {
    res.render('cocktails')
});

router.get('/results', (req, res) => {
    res.render('results');
});

// Login Route
router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }
    res.render('login');
  });

module.exports = router;
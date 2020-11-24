const router = require('express').Router();
const sequelize = require('../config/connection');
const { Ingredient, User } = require('../models');

router.get('/', (req, res) => {
    Ingredient.findAll({
        attributes: [
            'name',
            'category_id'
        ]
    })
        .then(data => {
            const spirits = data.filter(spirit => spirit.category_id === 1);
            const filteredSpirits = spirits.map(filteredSpirit => filteredSpirit.get({ plain: true }));
            const wines = data.filter(wine => wine.category_id === 2);
            const filteredWines = wines.map(filteredWine => filteredWine.get({ plain: true }));
            const liqueurs = data.filter(liqueur => liqueur.category_id === 3);
            const filteredLiqueurs = liqueurs.map(filteredLiqueur => filteredLiqueur.get({ plain: true }));
            const syrups = data.filter(syrup => syrup.category_id === 4);
            const filteredSyrups = syrups.map(filteredSyrup => filteredSyrup.get({ plain: true }));
            const foods = data.filter(food => food.category_id === 5);
            const filteredFoods = foods.map(filteredFood => filteredFood.get({ plain: true }));
            const juices = data.filter(juice => juice.category_id === 6);
            const filteredJuices = juices.map(filteredJuice => filteredJuice.get({ plain: true }));
            const others = data.filter(other => other.category_id === 7);
            const filteredOthers = others.map(filteredOther => filteredOther.get({ plain: true }));

            // pass a single post object into the homepage template
            res.render('homepage', {
                spirits,
                filteredSpirits,
                wines,
                filteredWines,
                liqueurs,
                filteredLiqueurs,
                syrups,
                filteredSyrups,
                foods,
                filteredFoods,
                juices,
                filteredJuices,
                others,
                filteredOthers,
                loggedIn: req.session.loggedIn,
                signedUp: req.session.signedUp
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/cocktails', (req, res) => {
    console.log(req.session.loggedIn)
    res.render('cocktails', {loggedIn: req.session.loggedIn})
});

router.get('/results', (req, res) => {
    res.render('results', {loggedIn: req.session.loggedIn})
});

// Login Route
router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }
    res.render('login');
});

// signup Route
router.get('/signup', (req, res) => {
    res.render('signup', {loggedIn: req.session.loggedIn})
});

// Userpage Route
router.get('/userpage', (req, res) => {
    res.render('userpage', {loggedIn: req.session.loggedIn})
});

module.exports = router;
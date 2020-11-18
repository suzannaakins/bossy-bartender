const router = require('express').Router();
const sequelize = require('../config/connection');
const { Ingredient } = require('../models');

router.get('/', (req, res) => {
    Ingredient.findAll({
        where: {
            category_id: 1
        },
        attributes: [
            'name'
        ]
    })
        .then(data => {
            const spirits = data.map(spirit => spirit.get({ plain: true }));
            // pass a single post object into the homepage template
            console.log(spirits);
            res.render('homepage', {
                spirits
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/cocktails', (req, res) => {
    res.render('cocktails')
});

router.get('/results', (req, res) => {
    res.render('search')
});

// Login Route
router.get('/login', (req, res) => {
    // if (req.session.loggedIn) {
    //     console.log('hello');
    //   res.redirect('/');
    //   return;
    // }
    res.render('login');
});

module.exports = router;
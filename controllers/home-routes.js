const router = require('express').Router();
const sequelize = require('../config/connection');

router.get('/', (req, res) => {
    res.render('homepage')
});

router.get('/cocktails', (req, res) => {
    res.render('cocktails')
});

module.exports = router;
const router = require('express').Router();
const { Drinks, User } = require('../../models');
const withAuth = require('../../utils/auth');

// Get all Drinks in DB
router.get('/', (req, res) => {
    Drinks.findAll()
        .then(dbDrinksData => res.json(dbDrinksData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });

});

// Get 1 Drink
router.get('/:id', (req, res) => {
    Drink.findOne({
        where: {
            id: req.params.id
        },
        attributes: ['id', 'name', 'externalId'],
        include: [
            {
                model: User,
                attributes: ['id']
            },
        ]
    })
        .then(dbDrinksData => {
            if (!dbDrinksData) {
                res.status(404).json({ message: 'No drink found with this id' });
                return;
            }
            res.json(dbDrinksData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// Create a new Drink
router.post('/', withAuth, (req, res) => {
    Drink.create({
        name: req.body.name,
        externalId: req.body.externalId,
        image: req.body.image,
        glass: req.body.glass,
        ingredients: req.body.ingredients,
        measurements: req.body.measurements,
        instructions: req.body.instructions
    })
        .then(dbDrinksData => res.json(dbDrinksData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// Update a drink
router.put('/:id', withAuth, (req, res) => {
    Drink.update(
        {
            // ADD USER ID
            // name: req.body.name
        },
        {
            where: {
                id: req.params.id
            }
        }
    )
        .then(dbDrinksData => {
            if (!dbDrinksData) {
                res.status(404).json({ message: 'No drink found with this id' });
                return;
            }
            res.json(dbIngredientData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

//DELETE an ingredient
router.delete('/:id', withAuth, (req, res) => {
    Drink.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(dbDrinksData => {
            if (!dbDrinksData) {
                res.status(404).json({ message: 'No drink found with this id' });
                return;
            }
            res.json(dbDrinksData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;
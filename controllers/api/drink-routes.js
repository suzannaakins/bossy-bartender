const router = require('express').Router();
const { Drink, User } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/all', (req, res) => {
    Drink.bulkCreate(
        req.body
    )
        .then(dbDrinksData => res.json(dbDrinksData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
})

// Get all Drinks in DB
router.get('/', (req, res) => {
    Drink.findAll()
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
    if (req.session) {
    Drink.create({
        name: req.body.name,
        externalId: req.body.externalId,
        image: req.body.image,
        glass: req.body.glass,
        ingredients: req.body.ingredients,
        measurements: req.body.measurements,
        instructions: req.body.instructions,
        user_id: req.session.user_id
    })
        .then(dbDrinksData => res.json(dbDrinksData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    }
});

// Update a drink
router.put('/:id', withAuth, (req, res) => {
    if (req.session) {
    Drink.update(
        {
            user_id: req.body.user_id,
            name: req.body.name
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
    }
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
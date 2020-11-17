const router = require('express').Router();
const { Ingredient, Category } = require('../../models');
const withAuth = require('../../utils/auth');

//view ALL ingredients
router.get('/', (req, res) => {
    Ingredient.findAll({
        attributes: ['id', 'name'],
        include: [
            {
                model: Category,
                attributes: ['title']
            },
        ]
    })
        .then(dbIngredientData => res.json(dbIngredientData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });

});

//view ONE ingredient
router.get('/:id', (req, res) => {
    Ingredient.findOne({
        where: {
            id: req.params.id
        },
        attributes: ['id', 'name'],
        include: [
            {
                model: Category,
                attributes: ['title']
            },
        ]
    })
        .then(dbIngredientData => {
            if (!dbIngredientData) {
                res.status(404).json({ message: 'No ingredient found with this id' });
                return;
            }
            res.json(dbIngredientData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

//CREATE a neeeew ingredient
router.post('/', (req, res) => {
    Ingredient.create({
        name: req.body.name,
        category_id: req.body.category_id
    })
        .then(dbIngredientData => res.json(dbIngredientData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

//UPDATE ingredient name
router.put('/:id', (req, res) => {
    Ingredient.update(
        {
            name: req.body.name,
            category_id: req.body.category_id
        },
        {
            where: {
                id: req.params.id
            }
        }
    )
        .then(dbIngredientData => {
            if (!dbIngredientData) {
                res.status(404).json({ message: 'No ingredient found with this id' });
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
    Ingredient.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(dbIngredientData => {
            if (!dbIngredientData) {
                res.status(404).json({ message: 'No ingredient found with this id' });
                return;
            }
            res.json(dbIngredientData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;
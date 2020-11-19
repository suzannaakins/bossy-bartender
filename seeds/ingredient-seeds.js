const sequelize = require('../config/connection');
const { Ingredient } = require('../models');

const ingdata = [
  {
    name: "Absolut Citron",
    category_id: 1
  },
  {
    name: "Anejo Rum",
    category_id: 1
  },
  {
    name: "Apple Brandy",
    category_id: 1
  },
  {
    name: "Applejack",
    category_id: 1
  },
  {
    name: "Apricot Brandy",
    category_id: 1
  },
  {
    name: "Blackberry Brandy",
    category_id: 1
  },
  {
    name: "Blended Whiskey",
    category_id: 1
  },
  {
    name: "Bourbon",
    category_id: 1
  },
  {
    name: "Brandy",
    category_id: 1
  },
  {
    name: "Cherry Brandy",
    category_id: 1
  },
  {
    name: "Coffee Brandy",
    category_id: 1
  },
  {
    name: "Cognac",
    category_id: 1
  },
  {
    name: "Dark Rum",
    category_id: 1
  },
  {
    name: "Everclear",
    category_id: 1
  },
  {
    name: "Firewater",
    category_id: 1
  },
  {
    name: "Gin",
    category_id: 1
  },
  {
    name: "Irish Whiskey",
    category_id: 1
  },
  {
    name: "Johnnie Walker",
    category_id: 1
  },
  {
    name: "Lemon Vodka",
    category_id: 1
  },
  {
    name: "Light Rum",
    category_id: 1
  },
  {
    name: "Peach Vodka",
    category_id: 1
  },
  {
    name: "Pisco",
    category_id: 1
  },
  {
    name: "Rum",
    category_id: 1
  },
  {
    name: "Scotch",
    category_id: 1
  },
  {
    name: "Sloe Gin",
    category_id: 1
  },
  {
    name: "Southern Comfort",
    category_id: 1
  },
  {
    name: "Spiced Rum",
    category_id: 1
  },
  {
    name: "Tequila",
    category_id: 1
  },
  {
    name: "Vodka",
    category_id: 1
  },
  {
    name: "Whiskey",
    category_id: 1
  },
  {
    name: "Ale",
    category_id: 2
  },
  {
    name: "Champagne",
    category_id: 2
  },
  {
    name: "Cider",
    category_id: 2
  },
  {
    name: "Lager",
    category_id: 2
  },
  {
    name: "Port",
    category_id: 2
  },
  {
    name: "Red Wine",
    category_id: 2
  },
  {
    name: "Sherry",
    category_id: 2
  },
  {
    name: "Amaretto",
    category_id: 3
  },
  {
    name: "Chocolate Liqueur",
    category_id: 3
  },
  {
    name: "Coffee Liqueur",
    category_id: 3
  },
  {
    name: "Creme de Cacao",
    category_id: 3
  },
  {
    name: "Creme de Cassis",
    category_id: 3
  },
  {
    name: "Dry Vermouth",
    category_id: 3
  },
  {
    name: "Dubonnet Rouge",
    category_id: 3
  },
  {
    name: "Galliano",
    category_id: 3
  },
  {
    name: "Irish Cream",
    category_id: 3
  },
  {
    name: "Kahlua",
    category_id: 3
  },
  {
    name: "Midori Melon Liqueur",
    category_id: 3
  },
  {
    name: "Ouzo",
    category_id: 3
  },
  {
    name: "Peppermint Schnapps",
    category_id: 3
  },
  {
    name: "Ricard",
    category_id: 3
  },
  {
    name: "Sambuca",
    category_id: 3
  },
  {
    name: "Strawberry Schnapps",
    category_id: 3
  },
  {
    name: "Sweet Vermouth",
    category_id: 3
  },
  {
    name: "Triple Sec",
    category_id: 3
  },
  {
    name: "Chocolate Syrup",
    category_id: 4
  },
  {
    name: "Grenadine",
    category_id: 4
  },
  {
    name: "Sugar Syrup",
    category_id: 4
  },
  {
    name: "Angelica Root",
    category_id: 5
  },
  {
    name: "Berries",
    category_id: 5
  },
  {
    name: "Cantaloupe",
    category_id: 5
  },
  {
    name: "Chocolate",
    category_id: 5
  },
  {
    name: "Cocoa Powder",
    category_id: 5
  },
  {
    name: "Cranberries",
    category_id: 5
  },
  {
    name: "Demerara Sugar",
    category_id: 5
  },
  {
    name: "Egg Yolk",
    category_id: 5
  },
  {
    name: "Egg",
    category_id: 5
  },
  {
    name: "Ginger",
    category_id: 5
  },
  {
    name: "Grapes",
    category_id: 5
  },
  {
    name: "Kiwi",
    category_id: 5
  },
  {
    name: "Lemon",
    category_id: 5
  },
  {
    name: "Lime",
    category_id: 5
  },
  {
    name: "Mango",
    category_id: 5
  },
  {
    name: "Orange",
    category_id: 5
  },
  {
    name: "Strawberries",
    category_id: 5
  },
  {
    name: "Sugar",
    category_id: 5
  },
  {
    name: "Watermelon",
    category_id: 5
  },
  {
    name: "Yoghurt",
    category_id: 5
  },
  {
    name: "7-Up",
    category_id: 6
  },
  {
    name: "Apple Cider",
    category_id: 6
  },
  {
    name: "Apple Juice",
    category_id: 6
  },
  {
    name: "Carbonated Water",
    category_id: 6
  },
  {
    name: "Cranberry Juice",
    category_id: 6
  },
  {
    name: "Grape Juice",
    category_id: 6
  },
  {
    name: "Grapefruit Juice",
    category_id: 6
  },
  {
    name: "Lemon Juice",
    category_id: 6
  },
  {
    name: "Lemonade",
    category_id: 6
  },
  {
    name: "Lime Juice",
    category_id: 6
  },
  {
    name: "Peach Nectar",
    category_id: 6
  },
  {
    name: "Pineapple Juice",
    category_id: 6
  },
  {
    name: "Sprite",
    category_id: 6
  },
  {
    name: "Tomato Juice",
    category_id: 6
  },
  {
    name: "Bitters",
    category_id: 7
  },
  {
    name: "Coffee",
    category_id: 7
  },
  {
    name: "Espresso",
    category_id: 7
  },
  {
    name: "Heavy Cream",
    category_id: 7
  },
  {
    name: "Milk",
    category_id: 7
  },
  {
    name: "Orange Bitters",
    category_id: 7
  },
  {
    name: "Tea",
    category_id: 7
  }
]

const seedIngredients = () => Ingredient.bulkCreate(ingdata, { individualHooks: true });

module.exports = seedIngredients;
// const ingArr = [];
// const drinkSave = [];
var drinkContainerEl = $("#drink-container");
var homepageContainerEl = $("#homepage-container");

// Destroy Search Options
var destroyElement = function () {
    homepageContainerEl.html(null);
  };

// Get Drinks from Cocktails DB by each Ingredient
function getDrinksByIngList(event) {
    // Need Ingredients indicated by user
    // var ing = ingArr
    fetch(
        ('https://www.thecocktaildb.com/api/json/v2/9973533/filter.php?i=Gin,Lime_Juice')
    )
    .then(function(drinkResponse) {
        return drinkResponse.json();
    })
    .then(function(drinkReponse) {
        printDrinkOptions(drinkReponse);
    });
};

// Print the drink results to the user
var printDrinkOptions = function (response) {
    destroyElement();
    // Loop through the drinks
    for (let i =0; i < response.drinks.length; i++) {
        // Container for Each Drink
        var drinkCardContainer = $("<div>").addClass("card-columns");
        var card = $("<div>").addClass("card");
        var image = $("<div>").addClass("card-image-cap");
        var drinkId = response.drinks[i].idDrink
        // Display each Drink
        var drinkImage = $("<img>")
            .attr("src", response.drinks[i].strDrinkThumb)
            .attr("height", "200px")
        var drinkTitle = $("<h5>")
            .addClass("card-title")
            .text(response.drinks[i].strDrink);
        var drinkButton = $("<button>")
            .addClass("btn-sm drink-button")
            .attr("id", drinkId)
            .text("View Recipe");

        // Append Display to Container
        card.append(drinkImage, drinkTitle, drinkButton);
        drinkCardContainer.append(card);
        homepageContainerEl.append(drinkCardContainer);
    }
    $(".drink-button").on("click", function(event) {
        var newDrinkId = event.target.id
        getRecipe(newDrinkId)
    });
};  

// Once clicked call the cocktail API by Drink & Display the Recipe
function getRecipe(id) {
    console.log(id)
    // Need to pass in a variable for user's choice
    fetch(
        ('https://www.thecocktaildb.com/api/json/v2/9973533/lookup.php?i='+ id)
    )
    .then(function(recipeResponse) {
        return recipeResponse.json();
    })
    .then(function(recipeResponse) {
        printRecipe(recipeResponse);
    });
};

function printRecipe(response) {
    var drinkId = response.drinks[0].idDrink

    // Drink Container
    var drinkRecipeContainer = $("<div>").addClass("card-columns");
    var card = $("<div>").addClass("card");
    
    // Sinlge values for the recipe
    var drinkGlass = $("<p>")
        .text(response.drinks[0].strGlass)
    var drinkDirections = $("<p>")
        .text(response.drinks[0].strInstructions)
    
    // Drink Ingredients
    var drinkIngredients = [];
    drinkIngredients.push(response.drinks[0].strIngredient1,response.drinks[0].strIngredient2, response.drinks[0].strIngredient3,response.drinks[0].strIngredient4,response.drinks[0].strIngredient5,response.drinks[0].strIngredient6,response.drinks[0].strIngredient7,response.drinks[0].strIngredient8,response.drinks[0].strIngredient9,response.drinks[0].strIngredient10,response.drinks[0].strIngredient11,response.drinks[0].strIngredient12,response.drinks[0].strIngredient13,response.drinks[0].strIngredient14,response.drinks[0].strIngredient15) 
    
    // Remove Nulls
    var filteredDrinkIngredients = drinkIngredients.filter(function (el) {
        return el != null;
    });

    // Print Ingredients
    var drinkIngredientsPrint = $("<p>")
        .text(filteredDrinkIngredients)

    // Drink Measurements
    var drinkMeasurements = [];
    drinkMeasurements.push(response.drinks[0].strMeasure1,response.drinks[0].strMeasure2, response.drinks[0].strMeasure3,response.drinks[0].strMeasure4,response.drinks[0].strMeasure5,response.drinks[0].strMeasure6,response.drinks[0].strMeasure7,response.drinks[0].strMeasure8,response.drinks[0].strMeasure9,response.drinks[0].strMeasure10,response.drinks[0].strMeasure11,response.drinks[0].strMeasure12,response.drinks[0].strMeasure13,response.drinks[0].strMeasure14,response.drinks[0].strMeasure15)
    
    // Remove Nulls
    var filteredDrinkMeasurements = drinkMeasurements.filter(function (el) {
        return el != null;
    });
    // Print Measurements
    var drinkMeasurementsPrint = $("<p>")
        .text(filteredDrinkMeasurements)
    
    var saveButton = $("<button>")
    .addClass("btn-sm save-button")
    .attr("id", drinkId)
    .text("Save");

    // Append Display to Container
    card.append(drinkGlass, drinkDirections, drinkIngredientsPrint, drinkMeasurementsPrint, saveButton);
    drinkRecipeContainer.append(card);
    homepageContainerEl.append(drinkRecipeContainer);

    $(".save-button").on("click", function(event) {
        var newDrinkId = event.target.id
        saveRecipe(newDrinkId)
    });
};

function saveRecipe (id) {
    
}

// On Search 
$(document).on('click', '.search-button', function() {
    getDrinksByIngList();
});


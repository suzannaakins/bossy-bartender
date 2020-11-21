// Global Variables
// const drinkSave = [];
var ingredients = JSON.parse(window.localStorage.getItem("ingredients")) || [];
var drinkContainerEl = $("#drink-container");
var homepageContainerEl = $("#homepage-container");
var recipeContainerEl = $("#recipeModalInner")

// Destroy the Recipe Modal Contents
var destroyElement = function () {
    recipeContainerEl.html(null);
};

// Get Ingredients from Local Storage
var ingArr = function () {
    const filteredIngredients1 = ingredients[0].ingredients;
    const filteredIngredients2 = filteredIngredients1.map(f => f.replaceAll(" ", "_"))
    const filteredIngredients3 = filteredIngredients2.toString();
    getDrinksByIngList(filteredIngredients3);
    console.log(filteredIngredients3);
}

// Get Drinks from Cocktails DB by each Ingredient
async function getDrinksByIngList(ingredients) {
    fetch(
        ('https://www.thecocktaildb.com/api/json/v2/9973533/filter.php?i=' + ingredients)
    )
        .then(function (drinkResponse) {
            return drinkResponse.json();
        })
        .then(function (drinkReponse) {
            resultsFound(drinkReponse);
        });
};

// Header Text to Display if Results were found or not
function resultsFound(response) {
    if (response.drinks === "None Found") {
        var message = $("<h2>")
            .text("Sorry, no results match these ingredients - Please try to search again")
    }
    else {
        printDrinkOptions(response)
    }
    homepageContainerEl.append(message);
}

// Print the drink results to the user
var printDrinkOptions = function (response) {
    var message = $("<h2>")
        .text("Good News - We found " + response.drinks.length + " drinks that match your search!")
    homepageContainerEl.append(message);
    // Loop through the drinks
    for (let i = 0; i < response.drinks.length; i++) {
        // Container for Each Drink
        var drinkCardContainer = $("<div>").addClass("card-group");
        var card = $("<div>").addClass("card");
        var image = $("<div>").addClass("card-image-top");
        var drinkId = response.drinks[i].idDrink
        // Display each Drink
        var drinkImage = $("<img>")
            .attr("src", response.drinks[i].strDrinkThumb)
            .attr("width", "200px")
        var drinkTitle = $("<h5>")
            .addClass("card-title")
            .text(response.drinks[i].strDrink);
        var drinkButton = $("<div>")
            .html(`<button id=${drinkId} class="btn-small drink-button" data-toggle="modal" data-target="#recipeModal">
            View Recipe
          </button>`)

        // Append Display to Container
        card.append(drinkImage, drinkTitle, drinkButton);
        drinkCardContainer.append(card);
        homepageContainerEl.append(drinkCardContainer);
    }

    // Open the Recipe Modal on Click
    $(".drink-button").on("click", function (event) {
        var newDrinkId = event.target.id
        getRecipe(newDrinkId)
    });
};

// Once clicked call the cocktail API by Drink & Display the Recipe
function getRecipe(id) {
    // Passing the variable for user's choice to the cocktail API
    fetch(
        ('https://www.thecocktaildb.com/api/json/v2/9973533/lookup.php?i=' + id)
    )
        .then(function (recipeResponse) {
            return recipeResponse.json();
        })
        .then(function (recipeResponse) {
            printRecipe(recipeResponse);
        });
};

// Print the Recipe in the modal
function printRecipe(response) {
    // Destroy previous modal contents
    destroyElement();

    // Sinlge values for the recipe
    var drinkId = response.drinks[0].idDrink
    var drinkGlass = response.drinks[0].strGlass
    var drinkDirections = response.drinks[0].strInstructions
    var drinkTitle = response.drinks[0].strDrink

    // Drink Ingredients
    var drinkIngredients = [];
    drinkIngredients.push(response.drinks[0].strIngredient1, response.drinks[0].strIngredient2, response.drinks[0].strIngredient3, response.drinks[0].strIngredient4, response.drinks[0].strIngredient5, response.drinks[0].strIngredient6, response.drinks[0].strIngredient7, response.drinks[0].strIngredient8, response.drinks[0].strIngredient9, response.drinks[0].strIngredient10, response.drinks[0].strIngredient11, response.drinks[0].strIngredient12, response.drinks[0].strIngredient13, response.drinks[0].strIngredient14, response.drinks[0].strIngredient15)

    // Remove Nulls
    var filteredDrinkIngredients = drinkIngredients.filter(function (el) {
        return el != null;
    });

    // Drink Measurements
    var drinkMeasurements = [];
    drinkMeasurements.push(response.drinks[0].strMeasure1, response.drinks[0].strMeasure2, response.drinks[0].strMeasure3, response.drinks[0].strMeasure4, response.drinks[0].strMeasure5, response.drinks[0].strMeasure6, response.drinks[0].strMeasure7, response.drinks[0].strMeasure8, response.drinks[0].strMeasure9, response.drinks[0].strMeasure10, response.drinks[0].strMeasure11, response.drinks[0].strMeasure12, response.drinks[0].strMeasure13, response.drinks[0].strMeasure14, response.drinks[0].strMeasure15)

    // Remove Nulls
    var filteredDrinkMeasurements = drinkMeasurements.filter(function (el) {
        return el != null;
    });

    var recipeModalEl = $("<div>")
        .addClass("modal-content")
        .html(`
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLongTitle">
              ${drinkTitle}
              </h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              ${drinkGlass}
              ${drinkDirections}
              ${filteredDrinkMeasurements}
              ${filteredDrinkIngredients}
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="button" id=${drinkId} class="btn btn-primary save-button">Save Recipe</button>
            </div>
          </div>`
        )

    // Append Data into the Modal
    recipeContainerEl.append(recipeModalEl)

    // Send to Save function on click
    $(".save-button").on("click", function (event) {
        var newDrinkId = event.target.id
        saveRecipe(newDrinkId)
    });
}

// Save Recipes
function saveRecipe(id) {
    console.log(id + "Save button was clicked")
}

// Get Ingredients from Local Storage on Page load
ingArr();


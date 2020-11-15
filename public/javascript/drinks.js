// const ingArr = [];
// const drinkSave = [];
var drinkContainerEl = $("#drink-container");

// Get Drinks from Cocktails DB by each ingredient
function getDrinksByIngList(event) {
    // Need Ingredients indicated by user
    // var ing = ingArr
    fetch(
        ('https://www.thecocktaildb.com/api/json/v2/9973533/filter.php?i=Gin,Sugar,Lime_Juice')
    )
    .then(function(drinkResponse) {
        return drinkResponse.json();
    })
    .then(function(drinkReponse) {
        printDrinkOptions(drinkReponse);
        console.log(drinkReponse);
    });
};

// Print the drink results to the user
var printDrinkOptions = function (response) {
    console.log(response.drinks.length)
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
        var drinkTitle = $("<h5>")
            .addClass("card-title")
            .text(response.drinks[i].strDrink);
        var drinkButton = $("<button>")
            .addClass("btn-sm")
            .attr("id", "drink-click-" + [i])
            .text("Click Me");

        $(document).on("click", "#drink-click-" + [i], function() {
            console.log(drinkId)
            getRecipe(drinkId)
        });

        // Append Display to Container
        card.append(drinkImage, drinkTitle, drinkButton);
        drinkCardContainer.append(card);
        drinkContainerEl.append(drinkCardContainer);
    }
};

// On Search 
$(document).on('click', '.search-button', function() {
    getDrinksByIngList();
});
    

// Once clicked call the cocktail API by Drink & Display the Recipe
function getRecipe(id) {
    console.log("I'm clicked")
    // Need to pass in a variable for user's choice
    fetch(
        ('https://www.thecocktaildb.com/api/json/v2/9973533/lookup.php?i='+ id)
    )
    .then(function(recipeResponse) {
        return recipeResponse.json();
    })
    .then(function(recipeResponse) {
        printRecipe(recipeResponse)
        console.log(recipeResponse);
    });
};

function printRecipe(response) {
    console.log("Recipe");
}

    // var saveArray = funciton() {
        //  var drinkTitle = response.drinks[i].strDrink;
        //  var drinkImage = response.drinks[i].strDrinkThumb;
        //  var drinkId = response.drinks[i].idDrink;
        
        //  if (drinkTitle !== "") {

        //  var drinkInfo = {
        //      title: drinkTitle,
        //      image: drinkImage,
        //      id: drinkId
        //  };
        //   if (drinkSave.indexOf(drinkInfo) == -1){
        //  Add the value to the array
        //   drinkSave.push(drinkInfo);
        //  }
        //  console.log (drinkSave);
        // }
// }

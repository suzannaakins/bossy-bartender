const ingArr = [];
const ingArr1st = [];
var introContainerEl = $("#drink-container");

// Get Drinks from Cocktails DB by each ingredient
function getDrinksByIngList(event) {
    var ing = ingArr
    fetch(
        ('https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Gin')
    )
    .then(function(drinkResponse) {
        return drinkResponse.json();
    })
    .then(function(drinkReponse) {
        createDrinksArray(drinkReponse);
        loopDrinkMatches(drinkReponse);
        console.log(drinkReponse);
    });
};

var createDrinksArray = function (response) {
    console.log ("I'm clicked")
    console.log(response);
    // Loop through the drinks
    for (let i =0; i < response.drinks.length; i++) {
        console.log(response.drinks.length)
        
        response.forEach((storeIngredient) => {
            var drinkTitle = response.drinks[i].strDrink;
            var drinkImage = response.drinks[i].strDrinkThumb;
            var drinkId = response.drinks[i].idDrink;
        
            if (drinkTitle !== "") {
                var drinkSave = ingArr1st;

            var drinkInfo = {
                title: drinkTitle,
                image: drinkImage,
                id: drinkId
            };
             if (drinkSave.indexOf(drinkInfo) == -1){
            // Add the value to the array
             drinkSave.push(drinkInfo);
             console.log (ingArr1st);
            }
        }
        
        
         })
    }
}
    
    //Example:
    // Get list of Gin Drinks
    // https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Gin
    // Then get list of Lime Juice
    // https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Lime%20Juice
     
    // Create Array 1 of Objects & Array 2 Objects & PossibleDrinks 
    
    // Possibly loop through Array 1 & loop through Array 2 - compare and push out the ones that are equal
    // let possibleDrinks =

    // Print the drink results to the user
    var loopDrinkMatches = function (drinkMatch) {
        // Loop through the drink
        for (let i =0; i < drinkMatch.length; i++) {
      
          // Container for Each Drink
          var drinkCardContainer = $("<div>").addClass("col-sm");
          var card = $("<div>").addClass("card");
          var image = $("<div>").addClass("card-image-top");
          var title = $("<div>").addClass("card-title");
      
      
          // Display each Drink
          var drinkImage = $("<img>")
            .attr("src", response.drinks[i].strDrinkThumb)
          var drinkTitle = $("<h5>")
            .text(response.drinks[i].strDrink);
          var drinkChoose = $("<a>")
            console.log("I'm choosen")
      
          // Append Display to Container
          card.append(image.append(drinkImage));
          card.append(body.append(drinkTitle));
          drinkCardContainer.append(card);
          drinkContainerEl.append(drinkCardContainer);
        }
      };

    
    // On Search 
    $(document).on('click', '.search-button', function() {
        getDrinksByIngList();
        printCocktails();
    })
    

    // Once clicked call the cocktail API by Drink & Display the Recipe
    function displayChoosenDrink() {
        // Need to pass in a variable for user's choice
        fetch(
            ('https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=11007')
        )
        .then(function(drinkResponse) {
            return drinkResponse.json();
        })
        .then(function(drinkReponse) {
            createDrinksArray(drinkReponse);
            console.log(drinkReponse);
        });
    };

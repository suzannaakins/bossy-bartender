// Global Variables
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
            .text("Sorry, no results match these ingredients. We are building out our drink library, but you can still browse all the drinks we do have!")
        var browseDrinks = $("<div>")
            .html(`<button id="browse-button" class="btn"><a href="/cocktails">Browse Drinks</a></button>`)
    }
    else {
        printDrinkOptions(response)
    }
    homepageContainerEl.append(message, browseDrinks);
}

// Print the drink results to the user
var printDrinkOptions = function (response) {
    var message = $("<h2>")
        .text("Good News - We found " + response.drinks.length + " drinks that match your search!")
    
        homepageContainerEl.append(message);
    
    var drinkCardContainer = $("<div>").addClass("row justify-content-center");

    // Loop through the drinks
    for (let i = 0; i < response.drinks.length; i++) {
        // Container for Each Drink
        var card = $("<div>").addClass("card col-3 align-items-center");
        var image = $("<div>").addClass("card-image");
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
    var drinkId = response.drinks[0].idDrink;
    var drinkDirections = response.drinks[0].strInstructions;
    var drinkTitle = response.drinks[0].strDrink;
    var drinkGlassName = response.drinks[0].strGlass;
     
    // Drink Ingredients
    var drinkIngredients = [];
    drinkIngredients.push(response.drinks[0].strIngredient1, response.drinks[0].strIngredient2, response.drinks[0].strIngredient3, response.drinks[0].strIngredient4, response.drinks[0].strIngredient5, response.drinks[0].strIngredient6, response.drinks[0].strIngredient7, response.drinks[0].strIngredient8, response.drinks[0].strIngredient9, response.drinks[0].strIngredient10, response.drinks[0].strIngredient11, response.drinks[0].strIngredient12, response.drinks[0].strIngredient13, response.drinks[0].strIngredient14, response.drinks[0].strIngredient15)

    // Remove Nulls
    var filteredDrinkIngredients = drinkIngredients.filter(function (el) {
        return el != null;
    });

    // Convert Ingredients
    let convertedDrinkIngredients = replaceCommaLine(filteredDrinkIngredients);

    // Drink Measurements
    var drinkMeasurements = [];
    drinkMeasurements.push(response.drinks[0].strMeasure1, response.drinks[0].strMeasure2, response.drinks[0].strMeasure3, response.drinks[0].strMeasure4, response.drinks[0].strMeasure5, response.drinks[0].strMeasure6, response.drinks[0].strMeasure7, response.drinks[0].strMeasure8, response.drinks[0].strMeasure9, response.drinks[0].strMeasure10, response.drinks[0].strMeasure11, response.drinks[0].strMeasure12, response.drinks[0].strMeasure13, response.drinks[0].strMeasure14, response.drinks[0].strMeasure15)

    // Remove Nulls
    var filteredDrinkMeasurements = drinkMeasurements.filter(function (el) {
        return el != null;
    });
    
    // Convert Measurements
    let convertedDrinkMeasurements = replaceCommaLine(filteredDrinkMeasurements);
    function replaceCommaLine(data) { 
        var drinkToArray = data.toString().split(',').map(item => item.trim());
        return drinkToArray.join("<br />");
    }

    // Glass Icons
    var drinkGlass = response.drinks[0].strGlass
    console.log(drinkGlass);
    // Switch cases to render glasses
        if (drinkGlass == 'Balloon Glass') {
            drinkGlass = "./assets/images/balloon-glass.png";
        } else if (drinkGlass == 'Beer Glass'){
            drinkGlass = "./assets/images/beer-glass.png";
        } else if (drinkGlass == 'Beer mug'){
            drinkGlass = "./assets/images/beer-mug.png";
        } else if (drinkGlass == 'Beer pilsner'){
            drinkGlass = "./assets/images/beer-pilsner.png";
        } else if (drinkGlass == 'Brandy snifter'){
            drinkGlass = "./assets/images/brandy-snifter.png";
        } else if (drinkGlass == 'Champagne flute'){
            drinkGlass = "./assets/images/champagne-flute.png";
        } else if (drinkGlass == 'Cocktail glass' || drinkGlass == 'Martini Glass'){
            drinkGlass = "./assets/images/cocktail-glass.png";
        } else if (drinkGlass == 'Coffee mug'){
            drinkGlass = "./assets/images/coffee-mug.png";
        } else if (drinkGlass == 'Collins glass'){
            drinkGlass = "./assets/images/collins-glass.png";
        } else if (drinkGlass == 'Copper Mug'){
            drinkGlass = "./assets/images/copper-mug.png";
        } else if (drinkGlass == 'Cordial glass' || drinkGlass == 'Pousse cafe glass'){
            drinkGlass = "./assets/images/cordial-glass.png";
        } else if (drinkGlass == 'Coupe Glass'){
            drinkGlass = "./assets/images/coupe-glass.png";
        } else if (drinkGlass == 'Highball glass'){
            drinkGlass = "./assets/images/highball-glass.png";
        } else if (drinkGlass == 'Hurricane glass' || drinkGlass == 'Parfait Glass'){
            drinkGlass = "./assets/images/hurricane-glass.png";
        } else if (drinkGlass == 'Irish coffee cup'){
            drinkGlass = "./assets/images/irish-coffee-cup.png";
        } else if (drinkGlass == 'Jar' || drinkGlass == 'Mason Jar'){
            drinkGlass = "./assets/images/mason-jar.png";
        } else if (drinkGlass == 'Margarita glass' || drinkGlass == 'Margarita/Coupette glass'){
            drinkGlass = "./assets/images/margarita-glass.png";
        } else if (drinkGlass == 'Nick and Nora Glass'){
            drinkGlass = "./assets/images/nick-nora.png";
        } else if (drinkGlass == 'Old-fashioned glass'){
            drinkGlass = "./assets/images/old-fashioned.png";
        } else if (drinkGlass == 'Pint glass'){
            drinkGlass = "./assets/images/pint-glass.png";
        } else if (drinkGlass == 'Pitcher'){
            drinkGlass = "./assets/images/pitcher.png";
        } else if (drinkGlass == 'Punch bowl'){
             drinkGlass = "./assets/images/punch-bowl.png";
        } else if (drinkGlass == 'Shot glass'){
            drinkGlass = "./assets/images/shot-glass.png";
        } else if (drinkGlass == 'Whiskey sour glass'){
            drinkGlass = "./assets/images/whiskey-glass";
        } else {
            drinkGlass = "./assets/images/wine-glass.png"
        }
        console.log(drinkGlass);
        
    // Create the recipe
    var recipeModalEl = $("<div>")
        .addClass("modal-content")
        .html(`
            <div class="modal-header">
              <h5 class="modal-title">
              ${drinkTitle}
              </h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
            <div class="row modal-rows">
                <div class="col-10"><img src=${drinkGlass} height="50px">  Use a ${drinkGlassName}</div>
                <div class="col-10"><p></ br></p><p></ br></p></div>
                <div class="col-4">${convertedDrinkMeasurements}</div>
                <div class="col-6">${convertedDrinkIngredients}</div>
                <div class="col-10"><p></ br></p><p></ br></p></div>
                <div class="col-10">${drinkDirections}</div>    
                </div>
            </div>
            <div class="modal-footer">
            <button class="btn" type="button" id="smsText">Send to a Friend</button>
              <button type="button" id=${drinkId} class="btn save-button">Save Recipe</button>
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

    // Send Text Form
    // <form>
    //             <input type="tel" class="phone" />
    // </form>
}

// Get Recipe to Save
function saveRecipe (id) {

    fetch(
        ('https://www.thecocktaildb.com/api/json/v2/9973533/lookup.php?i=' + id)
    )
        .then(function (recipeResponse) {
            return recipeResponse.json();
        })
        .then(function (recipeResponse) {
            saveRecipeInDB(recipeResponse)
        });

}

// Save Recipe
async function saveRecipeInDB (response) {
    var name = response.drinks[0].strDrink
    var externalId = response.drinks[0].idDrink
    var image = response.drinks[0].strDrinkThumb
    var glass = response.drinks[0].strGlass
    var instructions = response.drinks[0].strInstructions
    // Need Measurements & Ingredients

    // Drink Ingredients
    var drinkIngredients = [];
    drinkIngredients.push(response.drinks[0].strIngredient1, response.drinks[0].strIngredient2, response.drinks[0].strIngredient3, response.drinks[0].strIngredient4, response.drinks[0].strIngredient5, response.drinks[0].strIngredient6, response.drinks[0].strIngredient7, response.drinks[0].strIngredient8, response.drinks[0].strIngredient9, response.drinks[0].strIngredient10, response.drinks[0].strIngredient11, response.drinks[0].strIngredient12, response.drinks[0].strIngredient13, response.drinks[0].strIngredient14, response.drinks[0].strIngredient15)

    // Remove Nulls
    var ingredientsArray = drinkIngredients.filter(function (el) {
        return el != null;
    });

    // Convert to String
    var ingredients = ingredientsArray.toString();

    // Drink Measurements
    var drinkMeasurements = [];
    drinkMeasurements.push(response.drinks[0].strMeasure1, response.drinks[0].strMeasure2, response.drinks[0].strMeasure3, response.drinks[0].strMeasure4, response.drinks[0].strMeasure5, response.drinks[0].strMeasure6, response.drinks[0].strMeasure7, response.drinks[0].strMeasure8, response.drinks[0].strMeasure9, response.drinks[0].strMeasure10, response.drinks[0].strMeasure11, response.drinks[0].strMeasure12, response.drinks[0].strMeasure13, response.drinks[0].strMeasure14, response.drinks[0].strMeasure15)

    // Remove Nulls
    var measurementsArray = drinkMeasurements.filter(function (el) {
        return el != null;
    });

    // Convert to String
    var measurements = measurementsArray.toString();


    if (externalId) {
        const response = await fetch('/api/drink', {
            method: 'POST',
            body: JSON.stringify({
                name,
                externalId,
                image,
                glass,
                instructions,
                measurements,
                ingredients
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.ok) {
            $("#recipeModal").modal('hide')
            alert(name + " was saved to your account!")
        } else {
            alert(response.statusText);
        }
    }
};


// Save Recipe - Working on de-duplication
// async function saveRecipeInDB (response) {
//     var name = response.drinks[0].strDrink
//     var externalId = response.drinks[0].idDrink
//     var image = response.drinks[0].strDrinkThumb
//     var glass = response.drinks[0].strGlass
//     var instructions = response.drinks[0].strInstructions
//     // Need Measurements & Ingredients

//     // Drink Ingredients
//     var drinkIngredients = [];
//     drinkIngredients.push(response.drinks[0].strIngredient1, response.drinks[0].strIngredient2, response.drinks[0].strIngredient3, response.drinks[0].strIngredient4, response.drinks[0].strIngredient5, response.drinks[0].strIngredient6, response.drinks[0].strIngredient7, response.drinks[0].strIngredient8, response.drinks[0].strIngredient9, response.drinks[0].strIngredient10, response.drinks[0].strIngredient11, response.drinks[0].strIngredient12, response.drinks[0].strIngredient13, response.drinks[0].strIngredient14, response.drinks[0].strIngredient15)

//     // Remove Nulls
//     var ingredientsArray = drinkIngredients.filter(function (el) {
//         return el != null;
//     });

//     // Convert to String
//     var ingredients = ingredientsArray.toString();

//     // Drink Measurements
//     var drinkMeasurements = [];
//     drinkMeasurements.push(response.drinks[0].strMeasure1, response.drinks[0].strMeasure2, response.drinks[0].strMeasure3, response.drinks[0].strMeasure4, response.drinks[0].strMeasure5, response.drinks[0].strMeasure6, response.drinks[0].strMeasure7, response.drinks[0].strMeasure8, response.drinks[0].strMeasure9, response.drinks[0].strMeasure10, response.drinks[0].strMeasure11, response.drinks[0].strMeasure12, response.drinks[0].strMeasure13, response.drinks[0].strMeasure14, response.drinks[0].strMeasure15)

//     // Remove Nulls
//     var measurementsArray = drinkMeasurements.filter(function (el) {
//         return el != null;
//     });

//     // Convert to String
//     var measurements = measurementsArray.toString();


//     if (externalId) {
//         const drinkResponse = await fetch('/api/drink', {
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json'
//             }
//         })
//         .then(function (drinkResponse) {
//             return drinkResponse.json();
//         })
//         .then(function (drinkResponse) {
//             checkExternalId(drinkResponse)
//         });
//     }
//     async function checkExternalId(drinkResponse) {
//         console.log(drinkResponse)
//         for (let i = 0; i < drinkResponse.length; i++) {
//             if(drinkResponse[i].externalId != externalId) {
//                 console.log(drinkResponse[i].externalId)
//                 postDrink(externalId);
//             }
//     async function postDrink(externalId) {
//         console.log(externalId)
//         const externalResponse = await fetch('/api/drink', {
//             method: 'POST',
//             body: JSON.stringify({
//                 name,
//                 externalId,
//                 image,
//                 glass,
//                 instructions,
//                 measurements,
//                 ingredients
//             }),
//             headers: {
//                 'Content-Type': 'application/json'
//             }
//         })
//         .then(function (externalResponse) {
//             return JSON.parse();
//         })
//         .then(function (externalResponse) {
//             console.log("saved")
//         })
//     }
//     }
// }
    
//                 // if (response.ok) {
//                 //     $("#recipeModal").modal('hide')
//                 //     alert(name + " was saved to your account!")
//                 // } else {
//                 //     alert(response.statusText);
//                 // }
//         // } else {
//         //     const response = await fetch('/api/drink/:id', {
//         //         method: 'PUT',
//         //         headers: {
//         //             'Content-Type': 'application/json'
//         //         }
//         //     });
//         //     if (response.ok) {
//         //         $("#recipeModal").modal('hide')
//         //         alert(name + " was saved to your account!")
//         //     } else {
//         //         alert(response.statusText);
//         //     }
//         // }
// };


// Get Ingredients from Local Storage on Page load
ingArr();


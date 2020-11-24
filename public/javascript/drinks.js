// Global Variables
var ingredients = JSON.parse(window.localStorage.getItem("ingredients")) || [];
var drinkContainerEl = $("#drink-container");
var homepageContainerEl = $("#homepage-container");
var recipeContainerEl = $("#recipeModalInner")
var cocktailsPageEl = $("#cocktails-page")

// Destroy the Recipe Modal Contents
var destroyElement = function () {
    recipeContainerEl.html(null);
};

var destroyCocktails = function () {
    cocktailsPageEl.html(null);
}


// Get Ingredients from Local Storage
var ingArr = function () {
    const filteredIngredients1 = ingredients[0].ingredients;
    const filteredIngredients2 = filteredIngredients1.map(f => f.replaceAll(" ", "_"))
    const filteredIngredients3 = filteredIngredients2.toString();
    getDrinksByIngList(filteredIngredients3);
}

// Get Drinks from Cocktails DB by each Ingredient
function getDrinksByIngList(ingredients) {
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
    if (response.drinks.length > 1) {
        var message = $("<h2>")
            .text("Good News - Here are " + response.drinks.length + " drinks suggested for you!")
        
        homepageContainerEl.append(message);
    }
    
    var drinkCardContainer = $("<div>").addClass("row justify-content-center");

    // Loop through the drinks
    for (let i = 0; i < response.drinks.length; i++) {
        // Container for Each Drink
        var card = $("<div>").addClass("card col-3-md align-items-center");
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
        } else if (drinkGlass == 'Collins glass' || drinkGlass == 'Collins Glass'){
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
        } else if (drinkGlass == 'Whiskey sour glass' || drinkGlass == 'Whiskey glass' || drinkGlass == 'Whiskey sour glass'){
            drinkGlass = "./assets/images/whiskey-glass.png";
        } else {
            drinkGlass = "./assets/images/wine-glass.png"
        }
        
    // Create the Recipe Modal
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
                <div class="col-4 measure">${convertedDrinkMeasurements}</div>
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
        
        destroyModal()
        var recipeModalFooter = $("<div>")
        .addClass("modal-replace")
        .html(`
            <p></p>
            <p>Your Drink has been saved to <a href="/userpage">your account</a></p>
            <p></p>`
        )
        // Append Data to Footer
        recipeModalEl.append(recipeModalFooter)
    });

    // Show Text Form on click
    $("#smsText").on("click", function (event) {
        var drinkName = event.target.drinkName
        showPhoneInput(drinkName)
    });
    
    // Destroy the Modal Footer Contents
    var recipeModalFooter = $(".modal-footer")
    var destroyModal = function () {
        recipeModalFooter.html(null);
    };

    // Show Text Form Options
    function showPhoneInput(data) {
        // Destroy Footer
        destroyModal()
        
        // Rebuild Footer
        var recipeModalFooter = $("<div>")
        .addClass("modal-replace")
        .html(`
            <form><input type="text" class="name" placeholder="Enter Your Name"/></form>
            <p></p>
            <form><input type="tel" class="phone" placeholder="Enter Digits Only"/></form>
            <p></p>
            <button class="send-text">Send Now</button>
            <p></p>`
        )
        // Append Data to Footer
        recipeModalEl.append(recipeModalFooter)
        
        // Send Text
        $(".send-text").on("click", function (event) {
            const phone_number = document.querySelector('.phone').value;
            const name = document.querySelector('.name').value
            const recipe = "Hey there! Bossy Bartender here, your friend  " + name +  " found this exciting new drink, " + drinkTitle + ", and thought you might want to explore new drinks too! Check us out at http://bossy-bartender.herokuapp.com/";

            if (phone_number) {
                response =  fetch('/api/twilio', {
                    method: 'POST',
                    body: JSON.stringify({
                        phone_number,
                        recipe,
                    }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
            }
            destroyModal()
        })
    };
}


// Get Recipe the user wants to Save
function saveRecipe (id) {
    fetch(
        ('https://www.thecocktaildb.com/api/json/v2/9973533/lookup.php?i=' + id)
    )
        .then(function (recipeResponse) {
            return recipeResponse.json();
        })
        .then(function (recipeResponse) {
            checkId(recipeResponse)
        });
}

// Check to see if the drink exists in the DB
function checkId(recipeResponse) {
    var externalId = recipeResponse.drinks[0].idDrink

    drinkResponse = fetch('/api/drink/byExternalId/' + externalId, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(function (drinkResponse) {
        return drinkResponse.json();
    })
    .then(function (drinkResponse) {
        if(drinkResponse.length >= 1) {
            saveRecipeInDB(recipeResponse)
        } else {
            saveRecipeInDB(recipeResponse)
        }
    });
}

// Save Recipe if it does not exist
function saveRecipeInDB (response) {
    // Single Drink Variables
    var name = response.drinks[0].strDrink
    var externalId = response.drinks[0].idDrink
    var image = response.drinks[0].strDrinkThumb
    var glass = response.drinks[0].strGlass
    var instructions = response.drinks[0].strInstructions

    // Drink Ingredients
    var drinkIngredients = [];
    drinkIngredients.push(response.drinks[0].strIngredient1, response.drinks[0].strIngredient2, response.drinks[0].strIngredient3, response.drinks[0].strIngredient4, response.drinks[0].strIngredient5, response.drinks[0].strIngredient6, response.drinks[0].strIngredient7, response.drinks[0].strIngredient8, response.drinks[0].strIngredient9, response.drinks[0].strIngredient10, response.drinks[0].strIngredient11, response.drinks[0].strIngredient12, response.drinks[0].strIngredient13, response.drinks[0].strIngredient14, response.drinks[0].strIngredient15)
    
    // Remove Nulls from Ingredients
    var ingredientsArray = drinkIngredients.filter(function (el) {
        return el != null;
    });

    // Convert Ingredients to String
    var ingredients = ingredientsArray.toString();

    // Drink Measurements
    var drinkMeasurements = [];
    drinkMeasurements.push(response.drinks[0].strMeasure1, response.drinks[0].strMeasure2, response.drinks[0].strMeasure3, response.drinks[0].strMeasure4, response.drinks[0].strMeasure5, response.drinks[0].strMeasure6, response.drinks[0].strMeasure7, response.drinks[0].strMeasure8, response.drinks[0].strMeasure9, response.drinks[0].strMeasure10, response.drinks[0].strMeasure11, response.drinks[0].strMeasure12, response.drinks[0].strMeasure13, response.drinks[0].strMeasure14, response.drinks[0].strMeasure15)

    // Remove Nulls from Measurements
    var measurementsArray = drinkMeasurements.filter(function (el) {
        return el != null;
    });

    // Convert Measurements to String
    var measurements = measurementsArray.toString();
    postDrink();

    // Post Drink to the DB
    function postDrink() {
        externalResponse = fetch('/api/drink', {
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
        })
        .then(function (externalResponse) {
            return externalResponse.json();
        })
        .then(function (externalResponse) {
            return;
        })
    }
}

// Update Drink to include User - Future Development
// function updateDrink(externalId) {
//     console.log(externalId)
//     externalResponse = fetch('/api/drink/:id', {
//         method: 'PUT',
//         body: JSON.stringify({
//             name,
//             externalId,
//             image,
//             glass,
//             instructions,
//             measurements,
//             ingredients
//         }),
//         headers: {
//             'Content-Type': 'application/json'
//         }
//     })
//     .then(function (response) {
//         return response.json();
//     })
//     .then(function (response) {

//     })
// }

// Get Ingredients from Local Storage on Results Page load
if(document.location.pathname === "/results"){
    ingArr();
}


// ---- Browse Cocktails Page ----

// Clear category-button on click
$(".category-button").on("click", function (event) {
    $("#homepage-container").empty();

    var category = $(this).attr("data-category")
    if (category === "random") {
        var message = $("<h2>")
            .text("Good News - Here is your random drink!")
        homepageContainerEl.append(message);
        getRandomCocktail()
    }
    else {
        getDrinksByCategory(category)
    }
});

// Get drinks by Category
async function getDrinksByCategory(category) {
    fetch(
        ('https://www.thecocktaildb.com/api/json/v2/9973533/filter.php?c=' + category)
    )
        .then(function (drinkResponse) {
            return drinkResponse.json();
        })
        .then(function (drinkResponse) {
            console.log("Here")
            printDrinkOptions(drinkResponse);
            console.log(drinkResponse)

        });
};

// Get Random Cocktail
function getRandomCocktail() {

    fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')

        .then(function (drinkResponse) {
            return drinkResponse.json();
        })
        .then(function (drinkResponse) {
            printDrinkOptions(drinkResponse);
            // console.log(drinkResponse);
        });
}

// Display Random Cocktail
function displayRandomCocktail(cocktail) {

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
// Global Variables
var savedDrinksContainerEl = $("#saved-drinks")
var userPageContainerEl = $("#user-page")

function getSavedDrinks() {
    fetch('/api/drink/byUser/:user_id', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
    .then(function (response) {
        return response.json();
    })
    .then(function (response) {
        console.log(response);
        printSavedDrinks(response);
    })
};

function printSavedDrinks(response) {
    var savedDrinksContainerEl = $("<div>").addClass("row justify-content-center");

    // Loop through saved drinks
    for (let i = 0; i < response.length; i++) {
        var cardRow = $("<div>").addClass("col-sm-6 drink-rows");
        var card = $("<div>").addClass("card");
        var cardBody = $("<div>").addClass("card-body");
        
        // Display each Drink
        var drinkTitle = $("<h3>")
            .addClass("card-title")
            .text(response[i].name);
        var drinkImage = $("<img>")
            .attr("src", response[i].image)
            .attr("width", "150px")

        
        var glass = response[i].glass


        // Switch cases to render glasses
            if (glass == 'Balloon Glass') {
                glass = "./assets/images/balloon-glass.png";
            } else if (glass == 'Beer Glass'){
                glass = "./assets/images/beer-glass.png";
            } else if (glass == 'Beer mug'){
                glass = "./assets/images/beer-mug.png";
            } else if (glass == 'Beer pilsner'){
                glass = "./assets/images/beer-pilsner.png";
            } else if (glass == 'Brandy snifter'){
                glass = "./assets/images/brandy-snifter.png";
            } else if (glass == 'Champagne flute'){
                glass = "./assets/images/champagne-flute.png";
            } else if (glass == 'Cocktail glass' || glass == 'Martini Glass'){
                glass = "./assets/images/cocktail-glass.png";
            } else if (glass == 'Coffee mug'){
                glass = "./assets/images/coffee-mug.png";
            } else if (glass == 'Collins glass'){
                glass = "./assets/images/collins-glass.png";
            } else if (glass == 'Copper Mug'){
                glass = "./assets/images/copper-mug.png";
            } else if (glass == 'Cordial glass' || glass == 'Pousse cafe glass'){
                glass = "./assets/images/cordial-glass.png";
            } else if (glass == 'Coupe Glass'){
                glass = "./assets/images/coupe-glass.png";
            } else if (glass == 'Highball glass'){
                glass = "./assets/images/highball-glass.png";
            } else if (glass == 'Hurricane glass' || glass == 'Parfait Glass'){
                glass = "./assets/images/hurricane-glass.png";
            } else if (glass == 'Irish coffee cup'){
                glass = "./assets/images/irish-coffee-cup.png";
            } else if (glass == 'Jar' || glass == 'Mason Jar'){
                glass = "./assets/images/mason-jar.png";
            } else if (glass == 'Margarita glass' || glass == 'Margarita/Coupette glass'){
                glass = "./assets/images/margarita-glass.png";
            } else if (glass == 'Nick and Nora Glass'){
                glass = "./assets/images/nick-nora.png";
            } else if (glass == 'Old-fashioned glass'){
                glass = "./assets/images/old-fashioned.png";
            } else if (glass == 'Pint glass'){
                glass = "./assets/images/pint-glass.png";
            } else if (glass == 'Pitcher'){
                glass = "./assets/images/pitcher.png";
            } else if (glass == 'Punch bowl'){
                    glass = "./assets/images/punch-bowl.png";
            } else if (glass == 'Shot glass'){
                glass = "./assets/images/shot-glass.png";
            } else if (glass == 'Whiskey sour glass'){
                glass = "./assets/images/whiskey-glass";
            } else {
                glass = "./assets/images/wine-glass.png"
            }
   
            
            var drinkGlassDescription = response[i].glass
            var drinkIngredients = response[i].ingredients
            
            let convertedDrinkIngredients = replaceCommaLine(drinkIngredients);
            function replaceCommaLine(data) { 
                var drinkToArray = data.split(',').map(item => item.trim());
                return drinkToArray.join("<br />");
            }

            var drinkMeasurements = response[i].measurements;
            
            let convertedDrinkMeasurements = replaceCommaLine(drinkMeasurements);
            function replaceCommaLine(data) { 
                var drinkToArray = data.split(',').map(item => item.trim());
                return drinkToArray.join("<br />");
            }
            
            var drinkDirections = response[i].instructions

            var recipe = $("<div>")
                .html(`
                <div class="row">
                    <div class="col-10"><img src=${glass} height="50px">  Use a ${drinkGlassDescription}</div>
                    <div class="col-10 make-it"><p>Ingredients</p></div>
                    <div class="col-5 drink-measurements">${convertedDrinkMeasurements}</div>
                    <div class="col-5 drink-ingredients">${convertedDrinkIngredients}</div>
                    <div class="col-10 make-it"><p>How to Make It</p></div>
                    <div class="col-10 drink-directions">${drinkDirections}</div>
                </div>`
            )

        // Append Display to Container
        cardBody.append(drinkTitle, drinkImage, recipe);
        card.append(cardBody)
        cardRow.append(card)
        savedDrinksContainerEl.append(cardRow);
        userPageContainerEl.append(savedDrinksContainerEl); 
    }
}

getSavedDrinks();
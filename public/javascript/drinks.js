const ingArr = [];
const ingArr1st = [];

// Get Drinks from Cocktails DB by each ingredient
function getDrinksByIngList(event) {
    console.log("I'm clicked")
    var ing = ingArr
    fetch(
        ('https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Gin')
    )
    .then(function(drinkResponse) {
        return drinkResponse.json();
    })
    .then(function(drinkReponse) {
        createDrinksArray(drinkReponse);
    })
}

var createDrinksArray = function (drinkResponse) {
    console.log ("I'm clicked")
    // Loop through the drinks
    // for (let i =0; i < drinkresponse.drinks.length; i++) {
    //     var drinkTitle = drinkResponse.drinks[i].strDrink;
    //     var drinkImage = drinkResponse.drinks[i].strDrinkThumb;
    //     var drinkId = drinkResponse.drinks[i].idDrink;
        
    //     if (drinkTitle !== "") {
    //         var drinkSave =
    //           ingArr1st;

    //     var drinkInfo = {
    //         title: drinkTitle,
    //         image: drinkImage,
    //         id: drinkId
    //     };
    //     if (drinkSave.indexOf(drinkInfo) == -1){
    //     //add the value to the array
    //     drinkSave.push(drinkInfo);
}
    
        // Example:
    // Get list of Gin Drinks
    // https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Gin
    // Then get list of Lime Juice
    // https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Lime%20Juice
     
    // Create Array 1 of Objects & Array 2 Objects & PossibleDrinks 
    // Possibly loop through Array 1 & loop through Array 2 - compare and push out the ones that are equal
    
    // Print the results to the user
    
    // Once clicked call the cocktail API by Drink

    // On Save store the drink recipe in full for recall for the user

    document.querySelector('.search-button').addEventListener('click', getDrinksByIngList);
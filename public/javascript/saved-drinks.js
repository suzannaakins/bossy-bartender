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
    console.log(response.length)
    for (let i = 0; i < response.length; i++) {
        var card = $("<div>").addClass("card col-3 align-items-center");
        // Display each Drink
        var drinkImage = $("<img>")
            .attr("src", response[i].image)
            .attr("width", "200px")
        var drinkTitle = $("<h5>")
            .addClass("card-title")
            .text(response[i].name);

        // Append Display to Container
        card.append(drinkImage, drinkTitle);
        savedDrinksContainerEl.append(card);
        userPageContainerEl.append(savedDrinksContainerEl); 
    }
}

getSavedDrinks();
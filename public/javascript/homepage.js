const userIngredients = [];
//const userIngredients = ['water'];  USE THIS if we get fancier api search working
document.getElementById("bar").innerHTML = ''

$(".dropdown-menu").on('click', '.dropdown-item', function () {
    const ingredient = $(this).text();
    userIngredients.push(ingredient);
    document.getElementById("bar").innerHTML += userIngredients[userIngredients.length - 1];

    console.log(userIngredients);
    
    // On Search 
    $(document).on('click', '.search-button', function() {
        sendIngredients(userIngredients);
    });
   
});

function sendIngredients() {
    window.localStorage.removeItem("ingredients");
    // If ingredients are empty
    if (userIngredients !== "") {
        var ingredients =
        JSON.parse(window.localStorage.getItem("ingredients")) || [];
        
        
        var newIngredients = {
            ingredients: userIngredients
        };

        // Save to Local Storage
        ingredients.push(newIngredients);
        window.localStorage.setItem("ingredients", JSON.stringify(ingredients));
    }
}
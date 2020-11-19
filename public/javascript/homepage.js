const userIngredients = [];
document.getElementById("bar").innerHTML = ''

$(".dropdown-menu").on('click', '.dropdown-item', function () {
    const ingredient = $(this).text();
    userIngredients.push(ingredient);
    document.getElementById("bar").innerHTML += userIngredients[userIngredients.length - 1];

    console.log(userIngredients);
});


function sendIngredients() {
    // If ingredients are empty
    if (userIngredients !== "") {
        var ingredients =
        JSON.parse(window.localStorage.getItem("ingredients")) || [];
        
        
        // var newList = {
        //     score: score,
        //     initials: initials
        // };

        // Save to Local Storage
        ingredients.push(newList);
        window.localStorage.setItem("ingredients", JSON.stringify(ingredients));
        
        // Redirect to Results page
        window.location.href = "results.handlebars";
    }
}
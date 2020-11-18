const userIngredients = [];
document.getElementById("bar").innerHTML = ''

$(".dropdown-menu").on('click', '.dropdown-item', function () {
    const ingredient = $(this).text();
    userIngredients.push(ingredient);
    document.getElementById("bar").innerHTML += userIngredients[userIngredients.length - 1];

    console.log(userIngredients);
});
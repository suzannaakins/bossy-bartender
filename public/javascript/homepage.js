const userIngredients = [];

$(".dropdown-menu").on('click', '.dropdown-item', function () {
    const ingredient = $(this).text();
    userIngredients.push(ingredient);
    console.log(userIngredients);
});
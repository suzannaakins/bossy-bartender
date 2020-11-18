const userIngredients = [];

$(".dropdown-menu").on('click', '.dropdown-item', function () {
    const ingredient = $(this).text();
    console.log(ingredient);
});
const userIngredients = [];
const trashIcon = `<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-trash" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
<path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
</svg>`

//const userIngredients = ['water'];  USE THIS if we get fancier api search working
document.getElementById("bar").innerHTML = ''


$(".dropdown-menu").on('click', '.dropdown-item', function () {
    const ingredient = $(this).text();
    userIngredients.indexOf(ingredient) === -1 ? userIngredients.push(ingredient) : console.log('this item already exists');
    const bar = document.getElementById("bar")
    const ul = document.createElement("ul")
    bar.textContent = ""
    for (i = 0; i < userIngredients.length; i++) {
        const li = document.createElement("li")
        li.innerHTML = userIngredients[i] + "  " + " " + " " + trashIcon;
        $(li).attr("id", userIngredients[i])
        ul.append(li)
    }
    bar.append(ul);

    $('.bi-trash').on('click', function () {
        //remove ingredient from array
        const currId = $(this).parent().attr("id");
        const index = userIngredients.indexOf(currId);
        userIngredients.splice(index, 1);
        //remove ingredient and trash icon from page 
        $(this).parent().remove();
    })

    // On Search 
    $(document).on('click', '.search-button', function () {
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
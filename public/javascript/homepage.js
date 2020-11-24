//array that holds ingredients that user selects from the dropdowns
const userIngredients = [];
//HTML for trash icon
const trashIcon = `<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-trash" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
<path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
</svg>`

function loadusername() {
    $.get("/api/users/getusername", function(data){
        console.log(data)
    
        $("#username").html("Hi <b>" + data + "</b>")
    })
 
}

loadusername()
$(".menu").on("click", function() {
    loadusername()
})

//const userIngredients = ['water'];  USE THIS if we get fancier api search working, 
//to ensure that users get cocktails that require water since everyone has water at home (hopefully)

//set bar area to empty on page load, so user can start from scratch and add their ingredients
document.getElementById("bar").innerHTML = ''

//This function handles what happens when user clicks on an item from the dropdown menu.
$(".dropdown-menu").on('click', '.dropdown-item', function () {
    //save item they clicked as an ingredient
    const ingredient = $(this).text();
    //push their selection to the ingredients array
    userIngredients.indexOf(ingredient) === -1 ? userIngredients.push(ingredient) : console.log('this item already exists');
    const bar = document.getElementById("bar")
    const ul = document.createElement("ul")
    bar.textContent = ""
    //add all of their selections to the bar 
    for (i = 0; i < userIngredients.length; i++) {
        const li = document.createElement("li")
        li.innerHTML = userIngredients[i] + "  " + " " + " " + trashIcon;
        $(li).attr("id", userIngredients[i])
        ul.append(li)
    }
    bar.append(ul);

    //delete ingredient from bar AND array when trash icon next to ingredient is clicked
    $('.bi-trash').on('click', function () {
        //remove ingredient from array
        const currId = $(this).parent().attr("id");
        const index = userIngredients.indexOf(currId);
        userIngredients.splice(index, 1);
        //remove ingredient and trash icon from page 
        $(this).parent().remove();
    })

    // When user clicks search button, go to sendIngredients function
    $(document).on('click', '.search-button', function () {
        sendIngredients(userIngredients);
    });
});

//send ingredients array to local storage
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
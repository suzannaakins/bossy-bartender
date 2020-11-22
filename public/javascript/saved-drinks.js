// Global Variables
var savedDrinksContainerEl = $("#saved-drinks")

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
    })
};

// async function getSavedDrinks() {
//     const response = await fetch('/api/drink', {
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json'
//             }
//         });
//         if (response.ok) {
//             console.log(response)
//         } else {
//             alert(response.statusText);
//         }
// };

getSavedDrinks();
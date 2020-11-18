// async function inMyBar(event) {
//     event.preventDefault();
//     //code to capture value of .dropdown-item
// }

// document.querySelector('.dropdown-item').addEventListener('click', inMyBar);

const ingredient = $('.dropdown-item').val($(this).html());
console.log(ingredient);
async function browseCocktails() {
    // create a new Library instance and store it in a variable called "customBlogPosts"
    var browseDrinks = new FsLibrary('.drink-list')

    // define 4 filter groups in an array and store it in a variable called myFilters
    var drinkFilters = [
        {
            filterWrapper: ".filter-bar-category",  // parent wrapper of filter group1
            filterType: "exclusive"
        },
        {
            filterWrapper: ".filter-bar-color",  // parent wrapper of filter group2
            filterType: "multi",
            filterByClass: ".color"  // class of the text that holds the filter info (optional)
        },
        {
            filterWrapper: ".filter-bar-price",  // parent wrapper of filter group3
            filterType: "multi",
            filterRange: true  // filter by number range (optional)
        },
        {
            filterWrapper: ".filter-bar-service",  // parent wrapper of filter group4
            filterType: "multi"
        }
    ]

    // run the filter Library component on your instance
    browseDrinks.filter({
        filterArray: drinkFilters, // variable of the array we created above
        activeClass: 'button-active', // class that styles the active state (optional)
        emptyMessage: '.empty-message',
        animation: {
            enable: false,
        }
    })
};

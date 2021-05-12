const Category = require("../utils/fetchCategories")
const fetch = require("node-fetch");
const recipes = []

Category.fetchCategories.getCategories()
    .then((cat) => {
        createUrl(cat)
    });

async function createUrl(cat) {
    let catObjs = cat.categories;
    for (let i = 0; i<= 2; i++ ) {
        let catName = JSON.stringify(catObjs[i].strCategory)
        let url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${catName.replace(/"/g, "")}`
        try {
            let response = await fetch(url)
            let map = await response.json()
            recipes.push(map.meals)
            console.log(recipes)
        } catch (err) {
            console.log(err);
        }
    }

}


const Category = require("../utils/fetchCategories")
const fetch = require("node-fetch");
const recipes = []

Category.fetchCategories.getCategories()
    .then((cat) => {
        testCreate(cat)
    });


async function testCreate(cat) {
    for (let i=0; i<=25; i++) {
        let recipeId = 52764;
        let url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId + i}`
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
const { Recipe } = require("../models");
const fetch = require("node-fetch");
const recipes = []

async function recipeCreate() {
    for (let i=0; i<=2; i++) {
        let recipeId = 52764;
        let url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId + i}`
        try {
            let res = await fetch(url)
            let map = await res.json()
            let mapObj = map.meals[0]
            let recipeObj = {"title": mapObj.strMeal, "description": mapObj.strInstructions}
            recipes.push(recipeObj)
        } catch (err) {
            console.log(err);
        }
    }
    Recipe.bulkCreate(recipes)
}

module.exports = recipeCreate;
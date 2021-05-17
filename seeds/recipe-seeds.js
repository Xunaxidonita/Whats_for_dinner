const { Recipe } = require("../models");
const fetch = require("node-fetch");
const seedCategories = require("./category-seeds");
const recipes = [];

// const getCategoryList = async function () {
//   const categories = await seedCategories();
//   return categories.map((cat) => {
//     cat.category_name;
//   });
// };

// const categorySamples = async function () {
//   catList = getCategoryList();
// };

async function recipeCreate() {
  for (let i = 0; i <= 2; i++) {
    let recipeId = 52767;
    let url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${
      recipeId + i
    }`;
    try {
      let res = await fetch(url);
      let map = await res.json();
      let mapObj = map.meals[0];
      let recipeObj = {
        title: mapObj.strMeal,
        description: mapObj.strInstructions,
      };
      recipes.push(recipeObj);
    } catch (err) {
      console.log(err);
    }
  }
  try {
    debugger;
    await Recipe.bulkCreate(recipes);
  } catch (err) {
    console.log(err);
  }
}

module.exports = recipeCreate;

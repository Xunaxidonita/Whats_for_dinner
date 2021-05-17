const { Category } = require("../models");
const seed = [];

const fetch = require("node-fetch");

async function seedCategories() {
  try {
    let res = await fetch(
      "https://www.themealdb.com/api/json/v1/1/categories.php"
    );
    let map = await res.json();
    let catObjs = map.categories;
    for (let i = 0; i <= 13; i++) {
      let catObj = { category_name: catObjs[i].strCategory };
      seed.push(catObj);
    }
    await Category.bulkCreate(seed);
  } catch (err) {
    console.log(err);
  }
}

module.exports = seedCategories;

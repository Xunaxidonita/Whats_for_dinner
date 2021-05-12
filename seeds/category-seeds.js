const Category = require("../utils/fetchCategories")
const fetch = require("node-fetch");
const seed = [];



fetchCategories.getCategories()
.then((cat) => {
    for(let i = 0; i <= 13; i++){
        let catObj = {"category_name": cat[i].strCategory }
        seed.push(catObj)
        categories.push(cat[i].strCategory)
    };
});

const seedCategories = () => Category.bulkCreate(categoryData);



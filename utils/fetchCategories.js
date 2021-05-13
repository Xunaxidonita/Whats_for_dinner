const fetch = require("node-fetch");

const fetchCategories = {
    getCategories() {
        return fetch("https://www.themealdb.com/api/json/v1/1/categories.php")
        .then((res) => res.json())
        .then((responseData) => {
            console.log(responseData);
            return responseData;
        })

    }
}

module.exports = { fetchCategories }
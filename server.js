const exphbs = require("express-handlebars");
const hbs = exphbs.create({});
const env = require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3001;
//const routes = require("./routes");

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

//app.use(routes);

// sync sequelize models to the database, then turn on the server
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});

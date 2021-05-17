const express = require("express");
const path = require("path");
const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const exphbs = require("express-handlebars");
<<<<<<< HEAD
const hbs = exphbs.create({});
=======
const helpers = require("./utils/helpers");
const hbs = exphbs.create({ helpers });
>>>>>>> 618a2fc7700e3774e6eb927f9e28717ab35303fa
require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 3001;

const routes = require("./controllers");
const sequelize = require("./config/connection");

const sess = {
  secret: process.env.SECRET,
  cookie: {},
  resave: false,
  saveUninitialized: false,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

<<<<<<< HEAD
app.use(express.static("public"));
=======
>>>>>>> 618a2fc7700e3774e6eb927f9e28717ab35303fa
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
app.use(session(sess));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
<<<<<<< HEAD
=======
app.use(express.static(path.join(__dirname, "public")));

>>>>>>> 618a2fc7700e3774e6eb927f9e28717ab35303fa
app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Now listening on port ${PORT}`));
});

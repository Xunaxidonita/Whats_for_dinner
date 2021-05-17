const router = require("express").Router();
const sequelize = require("../config/connection");
const { Recipe, User, Comment, Category } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", withAuth, (req, res) => {
  Recipe.findAll({
    where: {
      user_id: req.session.user_id,
    },
    attributes: ["id", "title", "description", "category_id", "user_id"],
    order: [["created_at", "DESC"]],
    include: [
      {
        model: Comment,
        attributes: ["id", "comment_text", "user_id", "recipe_id"],
        include: {
          model: User,
          attributes: ["username"],
        },
      },
      {
        model: User,
        attributes: ["username"],
      },
    ],
  })
    .then((dbRecipeData) => {
      const recipes = dbRecipeData.map((recipe) => recipe.get({ plain: true }));
      res.render("dashboard", {
        recipes,
        loggedIn: true,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/edit/:id", withAuth, (req, res) => {
  Recipe.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ["id", "title", "description", "category_id", "user_id"],
    order: [["created_at", "DESC"]],
    include: [
      {
        model: Comment,
        attributes: ["id", "comment_text", "user_id", "recipe_id"],
        include: {
          model: User,
          attributes: ["username"],
        },
      },
      {
        model: User,
        attributes: ["username"],
      },
    ],
  })
    .then((dbRecipeData) => {
      if (!dbRecipeData) {
        return res
          .status(404)
          .json({ message: "No Recipe found with this ID" });
      }
      const recipe = dbRecipeData.get({ plain: true });
      debugger;
      res.render("edit-post", { post });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;

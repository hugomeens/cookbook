const path = require("path");
const RecipeDao = require("../../dao/recipe-dao");
let dao = new RecipeDao();

const Ajv = require("ajv").default;
const { listRecipeSchema } = require("../../schemas/recipe-schemas");

async function ListAbl(req, res) {
    try {
      const recipes = await dao.listRecipes();
      res.json(recipes);
    } catch (e) {
      res.status(500).send(e);
    }
  }
  
  module.exports = ListAbl;
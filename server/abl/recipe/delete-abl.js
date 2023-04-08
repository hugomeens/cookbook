const path = require("path");
const RecipeDao = require("../../dao/recipe-dao");
let dao = new RecipeDao();

const Ajv = require("ajv").default;
const { deleteRecipeSchema } = require("../../schemas/recipe-schemas");

async function DeleteAbl(req, res) {
    const ajv = new Ajv();
    const valid = ajv.validate(deleteRecipeSchema, req.body);
    try {
      if (valid) {
        const recipeId = req.body.id;
        await dao.deleteRecipe(recipeId);
        res.json({});
      } else {
        res.status(400).send({
          errorMessage: "validation of input failed",
          params: req.body,
          reason: ajv.errors,
        });
      }
    } catch (e) {
      res.status(500).send(e.message);
    }
  }
  
  module.exports = DeleteAbl;
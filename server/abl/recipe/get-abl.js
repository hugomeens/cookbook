const path = require("path");
const RecipeDao = require("../../dao/recipe-dao");
let dao = new RecipeDao();

const Ajv = require("ajv").default;
const { getRecipeSchema } = require("../../schemas/recipe-schemas");

async function GetAbl(req, res) {
    try {
      const ajv = new Ajv();
      const body = req.query.id ? req.query : req.body;
      const valid = ajv.validate(getRecipeSchema, body);
      if (valid) {
        const recipeId = body.id;
        const recipe = await dao.getStudent(recipeId);
        if (!recipe) {
          res
            .status(400)
            .json({ error: `Student with id '${recipeId}' doesn't exist.` });
        }
        res.json(recipe);
      } else {
        res.status(400).json({
          errorMessage: "validation of input failed",
          params: body,
          reason: ajv.errors,
        });
      }
    } catch (e) {
      res.status(500).json(e);
    }
  }
  
  module.exports = GetAbl;
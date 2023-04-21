const path = require('path');
const { recipeDao } = require('../../dao/recipe-dao');
const { listRecipeSchema } = require('../../schemas/recipe-schema');
const Ajv = require('ajv').default;
const { statusCodes } = require('../../utils/statusCodes');

async function UpdateAbl(req, res) {
    try {
      const ajv = new Ajv();
      let recipe = req.body;
      const valid = ajv.validate(schema, recipe);
      if (valid) {
        recipe = await dao.updateRecipeSchema(recipe);
        res.json(recipe);
      } else {
        res.status(400).json({
          errorMessage: "validation of input failed",
          params: recipe,
          reason: ajv.errors,
        });
      }
    } catch (e) {
      if (e.message.startsWith("recipe with given id")) {
        res.status(400).json({ error: e.message });
      }
      res.status(500).json(e);
    }
  }
  
  module.exports = UpdateAbl;
  
const path = require("path");
const IngredientDao = require("../../dao/ingredient-dao");
let dao = new IngredientDao();

const Ajv = require("ajv").default;
const { updateIngredientSchema } = require("../../schemas/ingredient-schemas");

async function UpdateAbl(req, res) {
    try {
      const ajv = new Ajv();
      let ingredient = req.body;
      const valid = ajv.validate(schema, ingredient);
      if (valid) {
        ingredient = await dao.updateIngredientSchema(ingredient);
        res.json(ingredient);
      } else {
        res.status(400).send({
          errorMessage: "validation of input failed",
          params: ingredient,
          reason: ajv.errors,
        });
      }
    } catch (e) {
      if (e.message.startsWith("ingredient with given id")) {
        res.status(400).json({ error: e.message });
      }
      res.status(500).send(e);
    }
  }
  
  module.exports = UpdateAbl;
  
const path = require("path");
const IngredientDao = require("../../dao/ingredient-dao");

const Ajv = require("ajv").default;
const { deleteIngredientSchema } = require("../../schemas/ingredient-schemas");

async function DeleteAbl(req, res) {
    const ajv = new Ajv();
    const valid = ajv.validate(deleteIngredientSchema, req.body);
    try {
      if (valid) {
        const ingredientId = req.body.id;
        await dao.deleteIngredient(ingredientId);
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
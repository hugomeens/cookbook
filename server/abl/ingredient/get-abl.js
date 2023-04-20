const path = require("path");
const IngredientDao = require("../../dao/ingredient-dao");
let dao = new IngredientDao();

const Ajv = require("ajv").default;
const { getIngredientSchema } = require("../../schemas/ingredient-schemas");

async function GetAbl(req, res) {
    try {
      const ajv = new Ajv();
      const body = req.query.id ? req.query : req.body;
      const valid = ajv.validate(getIngredientSchema, body);
      if (valid) {
        const ingredientId = body.id;
        const ingredient = await dao.getStudent(ingredientId);
        if (!ingredient) {
          res
            .status(400)
            .json({ error: `Student with id '${ingredientId}' doesn't exist.` });
        }
        res.json(ingredient);
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
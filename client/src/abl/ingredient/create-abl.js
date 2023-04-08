const path = require("path");
const IngredientDao = require("../../dao/ingredient-dao");
let dao = new IngredientDao();

const Ajv = require("ajv").default;
const { createIngredientSchema } = require("../../schemas/ingredient-schemas");

async function CreateAbl(body, res) {

  const ajv = new Ajv();
  const valid = ajv.validate(createIngredientSchema, body);
  
  if (!valid) {
    return res.status(400).json({error: ajv.errors});
  }

  const ingredient = {  //TODO
    id: body.id,
    name: body.name,
    surname: body.surname,
    class: body.class
  };

  try {
    await dao.addIngredient(ingredient);
  } catch (e) {
    if (e.id === "DUPLICATE_ID") {
      res.status(400);
    } else {
      res.status(500);
    }
    return res.json({error: e.message});
  }

  res.json(ingredient);

}

module.exports = CreateAbl;
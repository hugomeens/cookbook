const path = require("path");
const RecipeDao = require("../../dao/recipe-dao");
let dao = new RecipeDao();

const Ajv = require("ajv").default;
const { createRecipeSchema } = require("../../schemas/recipe-schemas");

async function CreateAbl(body, res) {

  const ajv = new Ajv();
  const valid = ajv.validate(createRecipeSchema, body);
  
  if (!valid) {
    return res.status(400).json({error: ajv.errors});
  }

  const recipe = {  //TODO
    id: body.id,
    name: body.name,
    surname: body.surname,
    class: body.class
  };

  try {
    await dao.addRecipe(recipe);
  } catch (e) {
    if (e.id === "DUPLICATE_ID") {
      res.status(400);
    } else {
      res.status(500);
    }
    return res.json({error: e.message});
  }

  res.json(recipe);

}

module.exports = CreateAbl;
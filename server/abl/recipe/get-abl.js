const path = require('path');
const { recipeDao } = require('../../dao/recipe-dao');
const { getRecipeSchema } = require('../../schemas/recipe-schema');
const Ajv = require('ajv').default;
const { statusCodes } = require('../../utils/statusCodes');

async function GetAbl(body, res) {
  const ajv = new Ajv();
  const valid = ajv.validate(getRecipeSchema, body);

  if (!valid) {
    return res.status(statusCodes.BAD_REQUEST).json({ error: ajv.errors });
  }

  let recipes;
    try {
        recipes = await recipeDao.get();
        res.status(statusCodes.OK).json(recipes);
    } catch (e) {
        res.status(statusCodes.INTERNAL_SERVER_ERROR).json({ error: e });
    }

}

module.exports = GetAbl;

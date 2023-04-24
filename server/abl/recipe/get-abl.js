const path = require('path');
const { recipeDao } = require('../../dao/recipe-dao');
const { viewRecipeSchema } = require('../../schemas/recipe-schema');
const Ajv = require('ajv').default;
const { statusCodes } = require('../../utils/statusCodes');

async function GetAbl(body, res) {
  const ajv = new Ajv();
  const valid = ajv.validate(viewRecipeSchema, body);

  if (!valid) {
    return res.status(statusCodes.BAD_REQUEST).json({ error: ajv.errors });
  }

  try {
    const mongoRes = await recipeDao.view(body._id);
    if (!mongoRes) {
      res.status(statusCodes.NOT_FOUND).json({ error: 'Recipe not found.' });
    } else {
      res.status(statusCodes.OK).json({
        _id: mongoRes._id,
        name: mongoRes.name,
        description: mongoRes.description,
        img: mongoRes.img,
        nbPerson: mongoRes.nbPerson,
        preparationTime: mongoRes.preparationTime,
        ingredients: mongoRes.ingredients,
        instructions: mongoRes.instructions,
        valid: mongoRes.valid
      });
    }
  } catch (e) {
    res.status(statusCodes.INTERNAL_SERVER_ERROR).json({ error: e });
  }
}

module.exports = GetAbl;

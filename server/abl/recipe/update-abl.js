const path = require('path');
const { recipeDao } = require('../../dao/recipe-dao');
const { updateRecipeSchema } = require('../../schemas/recipe-schema');
const Ajv = require('ajv').default;
const { statusCodes } = require('../../utils/statusCodes');

async function UpdateAbl(body, res) {
  const ajv = new Ajv();
  const valid = ajv.validate(updateRecipeSchema, body);

  if (!valid) {
    return res.status(statusCodes.BAD_REQUEST).json({ error: ajv.errors });
  }

  try {
    const id = body.id;
    delete body.id;
    const mongoRes = await recipeDao.update(id, body);
    if (mongoRes.matchedCount == 0) {
      res.status(statusCodes.NOT_FOUND).json({ error: 'Recipe not found.' });
    } else {
      res.status(statusCodes.OK).json({ _id: id });
    }
  } catch (e) {
    console.log(e);
    res.status(statusCodes.INTERNAL_SERVER_ERROR).json({ error: e });
  }
}

module.exports = UpdateAbl;

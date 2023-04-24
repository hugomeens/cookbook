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
    const _id = body._id;
    delete body._id;
    const mongoRes = await recipeDao.update(_id, body);
    if (mongoRes.matchedCount == 0) {
      res.status(statusCodes.NOT_FOUND).json({ error: 'Recipe not found.' });
    } else {
      body._id = _id;
      res.status(statusCodes.OK).json(body);
    }
  } catch (e) {
    console.log(e);
    res.status(statusCodes.INTERNAL_SERVER_ERROR).json({ error: e });
  }
}

module.exports = UpdateAbl;

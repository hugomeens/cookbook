const Ajv = require('ajv').default;
const { recipeDao } = require('../../dao/recipe-dao');
const { deleteRecipeSchema } = require('../../schemas/recipe-schema');
const { statusCodes } = require('../../utils/statusCodes');

async function DeleteAbl(body, res) {
  const ajv = new Ajv();
  const valid = ajv.validate(deleteRecipeSchema, body);
  if (!valid) {
    return res.status(statusCodes.BAD_REQUEST).json({ error: ajv.errors });
  }

  try {
    const mongoRes = await recipeDao.delete(body.id);
    if (mongoRes.deletedCount == 0) {
      res.status(statusCodes.NOT_FOUND).json({ error: 'Recipe not found.' });
    } else {
      res.status(statusCodes.OK).json({ _id: body.id });
    }
  } catch (e) {
    res.status(statusCodes.INTERNAL_SERVER_ERROR).json({ error: e });
  }
}

module.exports = DeleteAbl;
const { recipeDao } = require('../../dao/recipe-dao');
const { createRecipeSchema } = require('../../schemas/recipe-schema');
const Ajv = require('ajv').default;
const { statusCodes } = require('../../utils/statusCodes');

async function CreateAbl(body, res) {
  const ajv = new Ajv();
  const valid = ajv.validate(createRecipeSchema, body);
  
  if (!valid) {
    return res.status(statusCodes.BAD_REQUEST).json({ error: ajv.errors });
  }

  const recipe = {
    id: body.id,
    name: body.name,
    description: body.description,
    img: body.img,
    nbPerson: body.nbPerson,
    preparationTime: body.preparationTime,
    ingredients: body.ingredients,
    instructions: body.instructions
  };


  try {
    await recipeDao.create(recipe);
    res.status(statusCodes.OK).json(recipe);
  } catch (e) {
    // todo err msg duplication
    if (e.id === 'DUPLICATE_ID') {
        res.status(statusCodes.BAD_REQUEST).json({ error: e });
    } else {
        res.status(statusCodes.INTERNAL_SERVER_ERROR).json({ error: e });
    }
}
}

module.exports = CreateAbl;
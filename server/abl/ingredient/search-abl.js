const { ingredientDao } = require('../../dao/ingredient-dao');
const { searchIngredientSchema } = require('../../schemas/ingredient-schema');
const Ajv = require('ajv').default;
const { statusCodes } = require('../../utils/statusCodes');

async function SearchAbl(body, res) {
    const ajv = new Ajv({useDefaults: true});
    const valid = ajv.validate(searchIngredientSchema, body);
    if (!valid) {
        return res.status(statusCodes.BAD_REQUEST).json({ error: ajv.errors });
    }
    let ingredients;
    try {
        ingredients = await ingredientDao.search(body.search);
        console.log(ingredients)
        res.status(statusCodes.OK).json(ingredients);
    } catch (e) {
        res.status(statusCodes.INTERNAL_SERVER_ERROR).json({ error: e });
    }
}

module.exports = SearchAbl;

const path = require('path');
const { recipeDao } = require('../../dao/recipe-dao');
const { listRecipeSchema } = require('../../schemas/recipe-schema');
const Ajv = require('ajv').default;
const { statusCodes } = require('../../utils/statusCodes');

async function ListAbl(body, res) {
    const ajv = new Ajv({ useDefaults: true });
    const valid = ajv.validate(listRecipeSchema, body);

    if (!valid) {
        return res.status(statusCodes.BAD_REQUEST).json({ error: ajv.errors });
    }

    let recipes;
    try {
        recipes = await recipeDao.list(parseInt(body.offset), parseInt(body.limit), body.search);
        res.status(statusCodes.OK).json(recipes);
    } catch (e) {
        res.status(statusCodes.INTERNAL_SERVER_ERROR).json({ error: e });
    }
}

module.exports = ListAbl;

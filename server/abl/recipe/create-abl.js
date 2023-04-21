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

    try {
        body.valid = false;
        await recipeDao.create(body);
        res.status(statusCodes.OK).json(body);
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

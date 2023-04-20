const { ingredientDao } = require('../../dao/ingredient-dao');
const { createIngredientSchema } = require('../../schemas/ingredient-schema');
const Ajv = require('ajv').default;
const { statusCodes } = require('../../utils/statusCodes');

async function CreateAbl(body, res) {
    const ajv = new Ajv();
    const valid = ajv.validate(createIngredientSchema, body);

    if (!valid) {
        return res.status(400).json({ error: ajv.errors });
    }

    const ingredient = {
        name: body.name,
        alternativeNames: body.alternativeNames,
        imageId: body.imageId,
        unit: body.unit,
    };

    try {
        await ingredientDao.create(ingredient);
    } catch (e) {
        if (e.id === 'DUPLICATE_ID') {
            res.status(statusCodes.BAD_REQUEST);
        } else {
            res.status(statusCodes.INTERNAL_SERVER_ERROR);
        }
        return res.json({ error: e.message });
    }

    res.status(statusCodes.OK).json(ingredient);
}

module.exports = CreateAbl;

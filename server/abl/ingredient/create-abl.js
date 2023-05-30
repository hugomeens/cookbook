const { ingredientDao } = require('../../dao/ingredient-dao');
const { createIngredientSchema } = require('../../schemas/ingredient-schema');
const Ajv = require('ajv').default;
const { statusCodes } = require('../../utils/statusCodes');

async function CreateAbl(body, res) {
    const ajv = new Ajv();
    const valid = ajv.validate(createIngredientSchema, body);

    if (!valid) {
        return res.status(statusCodes.BAD_REQUEST).json({ error: ajv.errors });
    }

    const ingredient = {
        name: body.name,
        alternativeNames: body.alternativeNames,
        img: body.img,
        unit: body.unit,
        valid: false,
        fusion: "",
    };

    try {
        await ingredientDao.create(ingredient);
        res.status(statusCodes.OK).json(ingredient);
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

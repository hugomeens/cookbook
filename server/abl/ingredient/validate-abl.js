const path = require('path');
const { ingredientDao } = require('../../dao/ingredient-dao');
const { validateIngredientSchema } = require('../../schemas/ingredient-schema');
const Ajv = require('ajv').default;
const { statusCodes } = require('../../utils/statusCodes');

async function ValidateAbl(body, res) {
    const ajv = new Ajv();
    const valid = ajv.validate(validateIngredientSchema, body);

    if (!valid) {
        return res.status(statusCodes.BAD_REQUEST).json({ error: ajv.errors });
    }

    try {
        const mongoRes = await ingredientDao.validate(body.id);
        res.status(statusCodes.OK).json({_id: body.id});
    } catch (e) {
        res.status(statusCodes.INTERNAL_SERVER_ERROR).json({ error: e });
    }
}

module.exports = ValidateAbl;

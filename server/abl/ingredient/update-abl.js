const { ingredientDao } = require('../../dao/ingredient-dao');
const { updateIngredientSchema } = require('../../schemas/ingredient-schema');
const Ajv = require('ajv').default;
const { statusCodes } = require('../../utils/statusCodes');

async function UpdateAbl(body, res) {
    const ajv = new Ajv();
    const valid = ajv.validate(updateIngredientSchema, body);

    if (!valid) {
        return res.status(statusCodes.BAD_REQUEST).json({ error: ajv.errors });
    }

    try {
        const id = body._id;
        delete body._id;
        ingredientDao.update(id, body);
        body._id = id;
        res.status(statusCodes.OK).json(body);
    } catch (e) {
        console.log(e);
        res.status(statusCodes.INTERNAL_SERVER_ERROR).json({ error: e });
    }
}

module.exports = UpdateAbl;

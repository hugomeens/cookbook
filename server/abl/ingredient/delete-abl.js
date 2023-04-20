const Ajv = require('ajv').default;
const { ingredientDao } = require('../../dao/ingredient-dao');
const { deleteIngredientSchema } = require('../../schemas/ingredient-schema');
const { statusCodes } = require('../../utils/statusCodes');

async function DeleteAbl(body, res) {
    const ajv = new Ajv();
    const valid = ajv.validate(deleteIngredientSchema, body);
    if (!valid) {
        return res.status(statusCodes.BAD_REQUEST).json({ error: ajv.errors });
    }

    try {
        const mongoRes = await ingredientDao.delete(body._id);
        if (mongoRes.deletedCount == 0) {
            res.status(statusCodes.NOT_FOUND).json({ error: 'Ingredient not found.' });
        } else {
            res.status(statusCodes.OK).json({ _id: body._id });
        }
    } catch (e) {
        res.status(statusCodes.INTERNAL_SERVER_ERROR).json({ error: e });
    }
}

module.exports = DeleteAbl;

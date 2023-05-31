const path = require('path');
const { recipeDao } = require('../../dao/recipe-dao');
const { ingredientDao } = require('../../dao/ingredient-dao');
const { validateRecipeSchema } = require('../../schemas/recipe-schema');
const Ajv = require('ajv').default;
const { statusCodes } = require('../../utils/statusCodes');

async function ValidateAbl(body, res) {
    const ajv = new Ajv();
    const valid = ajv.validate(validateRecipeSchema, body);

    if (!valid) {
        return res.status(statusCodes.BAD_REQUEST).json({ error: ajv.errors });
    }

    try {
        const mongoRes = await recipeDao.view(body._id);
        if (mongoRes.matchedCount == 0) {
            res.status(statusCodes.NOT_FOUND).json({ error: 'Recipe not found.' });
        } else {
            const ingredientsInfo = await ingredientDao.view(mongoRes.ingredients);
            let cpt = ingredientsInfo.filter((item) => !item.valid).length;
            if (cpt === 0) {
                const valid = await recipeDao.validate(body._id);
                if (valid.matchedCount == 0) {
                    res.status(statusCodes.NOT_FOUND).json({ error: 'Recipe not found.' });
                } else {
                    res.status(statusCodes.OK).json({ _id: body._id });
                }
            } else {
                res.status(statusCodes.PRECONDITION_FAILED).json({ error: 'All ingredients are not valid.' });
            }
        }
    } catch (e) {
        res.status(statusCodes.INTERNAL_SERVER_ERROR).json({ error: e });
    }
}

module.exports = ValidateAbl;

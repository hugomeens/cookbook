'use strict';

const createRecipeSchema = {
    type: 'object',
    properties: {
        name: { type: 'string' },
        description: { type: 'string' },
        img: { type: 'img' },
        nbPerson: { type: 'number' },
        preparationTime: { type: 'number' },
        ingredients: { type: 'array' },
        instructions: { type: 'array' },
    },
    required: ['name', 'description', 'nbPerson', 'preparationTime', 'ingredients', 'instructions'],
};

const validateCreateRecipe = ajv.compile(createRecipeSchema);

const validateRecipeSchema = {
    type: 'object',
    properties: {
        id: { type: 'string' },
    },
    required: ['id'],
};

const validateValidateRecipe = ajv.compile(validateRecipeSchema);

const listRecipeSchema = {
    type: 'object',
    properties: {
        id: { type: 'string' },
    },
    required: ['id'],
};

const validateListRecipe = ajv.compile(listRecipeSchema);

const searchRecipeSchema = {
    type: 'object',
    properties: {
        id: { type: 'string' },
    },
    required: ['id'],
};

const validateSearchRecipe = ajv.compile(searchRecipeSchema);

const viewRecipeSchema = {
    type: 'object',
    properties: {
        id: { type: 'string' },
    },
    required: ['id'],
};

const validateViewRecipe = ajv.compile(viewRecipeSchema);

const updateRecipeSchema = {
    type: 'object',
    properties: {
        id: { type: 'string' },
    },
    required: ['id'],
};

const validateUpdateRecipe = ajv.compile(updateRecipeSchema);

const deleteRecipeSchema = {
    type: 'object',
    properties: {
        id: { type: 'string' },
    },
    required: ['id'],
};

const validateDeleteRecipe = ajv.compile(deleteRecipeSchema);

module.exports = {
    validateCreateRecipe,
    validateValidateRecipe,
    validateListRecipe,
    validateSearchRecipe,
    validateViewRecipe,
    validateUpdateRecipe,
    validateDeleteRecipe,
};

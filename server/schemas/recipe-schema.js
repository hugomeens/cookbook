'use strict';

const createRecipeSchema = {
    type: 'object',
    properties: {
        name: { type: 'string' },
        description: { type: 'string' },
        img: { type: 'string' },
        nbPerson: { type: 'number' },
        preparationTime: { type: 'number' },
        ingredients: { type: 'array' },
        instructions: { type: 'array' },
    },
    required: ['name', 'description', 'nbPerson', 'preparationTime', 'ingredients', 'instructions'],
};

const validateRecipeSchema = {
    type: 'object',
    properties: {
        id: { type: 'string' },
    },
    required: ['id'],
};

const listRecipeSchema = {
    type: 'object'
};

const searchRecipeSchema = {
    type: 'object',
    properties: {
        id: { type: 'string' },
    },
    required: ['id'],
};

const viewRecipeSchema = {
    type: 'object',
    properties: {
        id: { type: 'string' },
    },
    required: ['id'],
};

const updateRecipeSchema = {
    type: 'object',
    properties: {
        id: { type: 'string' },
    },
    required: ['id'],
};

const deleteRecipeSchema = {
    type: 'object',
    properties: {
        _id: { type: 'string' },
    },
    required: ['_id'],
};

module.exports = {
    createRecipeSchema,
    validateRecipeSchema,
    listRecipeSchema,
    searchRecipeSchema,
    viewRecipeSchema,
    updateRecipeSchema,
    deleteRecipeSchema,
};

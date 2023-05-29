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
        _id: { type: 'string' },
    },
    required: ['_id'],
};

const listRecipeSchema = {
    type: 'object',
    properties: {
        offset: { type: 'string', default: '0' },
        limit: { type: 'string', default: '20' },
        search: { type: 'string' },
    },
    required: ['offset', 'limit'],
};

const searchRecipeSchema = {
    type: 'object',
    properties: {
        _id: { type: 'string' },
    },
    required: ['_id'],
};

const viewRecipeSchema = {
    type: 'object',
    properties: {
        _id: { type: 'string' },
    },
    required: ['_id'],
};

const updateRecipeSchema = {
    type: 'object',
    properties: {
        _id: { type: 'string' },
    },
    required: ['_id'],
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

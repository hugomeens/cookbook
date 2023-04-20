'use strict';

const createIngredientSchema = {
    type: 'object',
    properties: {
        name: { type: 'string' },
        alternativeNames: { type: 'array' },
        imageId: { type: 'number' },
        unit: { type: 'string' },
    },
    required: ['name', 'alternativeNames', 'imageId', 'unit'],
};

const validateIngredientSchema = {
    type: 'object',
    properties: {
        id: { type: 'string' },
    },
    required: ['id'],
};

const listIngredientSchema = {
    type: 'object',
    properties: {
        id: { type: 'string' },
    },
    required: ['id'],
};

const searchIngredientSchema = {
    type: 'object',
    properties: {
        id: { type: 'string' },
    },
    required: ['id'],
};

const viewIngredientSchema = {
    type: 'object',
    properties: {
        id: { type: 'string' },
    },
    required: ['id'],
};

const updateIngredientSchema = {
    type: 'object',
    properties: {
        id: { type: 'string' },
    },
    required: ['id'],
};

const mergeIngredientSchema = {
    type: 'object',
    properties: {
        id: { type: 'string' },
    },
    required: ['id'],
};

module.exports = {
    createIngredientSchema,
    validateIngredientSchema,
    listIngredientSchema,
    searchIngredientSchema,
    viewIngredientSchema,
    updateIngredientSchema,
    mergeIngredientSchema,
};

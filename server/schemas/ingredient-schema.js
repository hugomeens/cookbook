'use strict';

const createIngredientSchema = {
    type: 'object',
    properties: {
        name: { type: 'string' },
        alternativeNames: { type: 'array' },
        imageId: { type: 'string' },
        unit: { type: 'string' },
    },
    required: ['name', 'alternativeNames', 'imageId', 'unit'],
    additionalProperties: false,
};

const validateIngredientSchema = {
    type: 'object',
    properties: {
        id: { type: 'string' },
    },
    required: ['id'],
    additionalProperties: false,
};

const listIngredientSchema = {
    type: 'object',
    properties: {},
    required: [],
    additionalProperties: false,
};

const deleteIngredientSchema = {
    type: 'object',
    properties: {
        id: { type: 'string' },
    },
    required: ['id'],
    additionalProperties: false,
};

const viewIngredientSchema = {
    type: 'object',
    properties: {
        id: { type: 'string' },
    },
    required: ['id'],
    additionalProperties: false,
};

const updateIngredientSchema = {
    type: 'object',
    properties: {
        id: { type: 'string' },
    },
    required: ['id'],
    additionalProperties: false,
};

const mergeIngredientSchema = {
    type: 'object',
    properties: {
        id: { type: 'string' },
    },
    required: ['id'],
    additionalProperties: false,
};

module.exports = {
    createIngredientSchema,
    validateIngredientSchema,
    listIngredientSchema,
    deleteIngredientSchema,
    viewIngredientSchema,
    updateIngredientSchema,
    mergeIngredientSchema,
};

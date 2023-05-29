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
        _id: { type: 'string' },
    },
    required: ['_id'],
    additionalProperties: false,
};

const listIngredientSchema = {
    type: 'object',
    properties: {
        offset: { type: 'string', default: '0' },
        limit: { type: 'string', default: '20' },
    },
    required: ['offset', 'limit'],
    additionalProperties: false,
};

const deleteIngredientSchema = {
    type: 'object',
    properties: {
        _id: { type: 'string' },
    },
    required: ['_id'],
    additionalProperties: false,
};

const viewIngredientSchema = {
    type: 'object',
    properties: {
        _id: { type: 'string' },
    },
    required: ['_id'],
    additionalProperties: false,
};

const updateIngredientSchema = {
    type: 'object',
    properties: {
        _id: { type: 'string' },
        name: { type: 'string' },
        alternativeNames: { type: 'array' },
        imageId: { type: 'string' },
        unit: { type: 'string' },
        valid: { type: 'boolean' },
        fusion: { type: 'string' },
    },
    required: ['_id'],
    additionalProperties: false,
};

const mergeIngredientSchema = {
    type: 'object',
    properties: {
        _id: { type: 'string' },
    },
    required: ['_id'],
    additionalProperties: false,
};

const searchIngredientSchema = {
    type: 'object',
    properties: {
        search: { type: 'string' },
    },
    required: ['search']
};

module.exports = {
    createIngredientSchema,
    validateIngredientSchema,
    listIngredientSchema,
    deleteIngredientSchema,
    viewIngredientSchema,
    updateIngredientSchema,
    mergeIngredientSchema,
    searchIngredientSchema,
};

'use strict';

const createIngredientSchema = {
    type: 'object',
    properties: {
        name: { type: 'string' },
        altName: { type: 'array' },
        description: { type: 'string' },
        img: { type: 'string' },
    },
    required: ['name', 'altName', 'description'],
};

const validateCreateIngredient = ajv.compile(createIngredientSchema);

const validateIngredientSchema = {
    type: 'object',
    properties: {
        id: { type: 'string' },
    },
    required: ['id'],
};

const validateValidateIngredient = ajv.compile(validateIngredientSchema);

const listIngredientSchema = {
    type: 'object',
    properties: {
        id: { type: 'string' },
    },
    required: ['id'],
};

const validateListIngredient = ajv.compile(listIngredientSchema);

const searchIngredientSchema = {
    type: 'object',
    properties: {
        id: { type: 'string' },
    },
    required: ['id'],
};

const validateSearch = ajv.compile(searchIngredientSchema);

const viewIngredientSchema = {
    type: 'object',
    properties: {
        id: { type: 'string' },
    },
    required: ['id'],
};

const validateViewIngredient = ajv.compile(viewIngredientSchema);

const updateIngredientSchema = {
    type: 'object',
    properties: {
        id: { type: 'string' },
    },
    required: ['id'],
};

const validateUpdateIngredient = ajv.compile(updateIngredientSchema);

const mergeIngredientSchema = {
    type: 'object',
    properties: {
        id: { type: 'string' },
    },
    required: ['id'],
};

const validateMergeIngredient = ajv.compile(mergeIngredientSchema);

module.exports = {
    validateCreateIngredient,
    validateValidateIngredient,
    validateListIngredient,
    validateSearch,
    validateViewIngredient,
    validateUpdateIngredient,
    validateMergeIngredient,
};

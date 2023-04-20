const express = require('express');
const CreateAbl = require('../abl/ingredient/create-abl');
const ListAbl = require('../abl/ingredient/list-abl');
const router = express.Router();

router.post('/create', async (req, res) => {
    await CreateAbl(req.body, res);
});

router.post('/validate', async (req, res) => {});

router.get('/list', async (req, res) => {
    await ListAbl(req.params, res);
});

router.put('/update', async (req, res) => {});

router.post('/merge', async (req, res) => {});

module.exports = {
    ingredientRouter: router,
};

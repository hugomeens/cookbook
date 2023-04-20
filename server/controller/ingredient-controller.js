const express = require('express');
const CreateAbl = require('../abl/ingredient/create-abl');
const DeleteAbl = require('../abl/ingredient/delete-abl');
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

router.delete(`/delete`, async (req, res) => {
    await DeleteAbl(req.body, res);
});

router.post('/merge', async (req, res) => {});

module.exports = {
    ingredientRouter: router,
};

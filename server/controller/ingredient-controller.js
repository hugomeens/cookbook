const express = require('express');
const CreateAbl = require('../abl/ingredient/create-abl');
const DeleteAbl = require('../abl/ingredient/delete-abl');
const ListAbl = require('../abl/ingredient/list-abl');
const UpdateAbl = require('../abl/ingredient/update-abl');
const ValidateAbl = require('../abl/ingredient/validate-abl');
const router = express.Router();

router.post('/create', async (req, res) => {
    await CreateAbl(req.body, res);
});

router.post('/validate', async (req, res) => {
    await ValidateAbl(req.body, res);
});

router.get('/list', async (req, res) => {
    await ListAbl(req.params, res);
});

router.post('/update', async (req, res) => {
    await UpdateAbl(req.body, res);
});

router.delete(`/delete/:_id`, async (req, res) => {
    await DeleteAbl(req.params, res);
});

router.post('/merge', async (req, res) => {});

module.exports = {
    ingredientRouter: router,
};

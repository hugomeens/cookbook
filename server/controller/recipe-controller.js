const express = require("express");
const CreateAbl = require('../abl/recipe/create-abl');
const DeleteAbl = require('../abl/recipe/delete-abl');
const ListAbl = require('../abl/recipe/list-abl');
//const GetAbl = require('../abl/recipe/get-abl');
const ValidateAbl = require('../abl/recipe/validate-abl');
const UpdateAbl = require('../abl/recipe/update-abl');
const router = express.Router();

router.post("/create", async (req, res) => {
    await CreateAbl(req.body, res);
});

router.post("/validate", async (req, res) => {
    await ValidateAbl(req.body, res);
});

router.get("/list", async (req, res) => {
    await ListAbl(req.params, res);
});

router.get("/search", async (req, res) => {
    await GetAbl(req.params, res);
});

router.get("/view", async (req, res) => {
    
});

router.put("/update", async (req, res) => {
    await UpdateAbl(req.body, res);
});

router.delete("/delete", async (req, res) => {
    await DeleteAbl(req.body, res);
});

module.exports = {
    recipeRouter: router
}


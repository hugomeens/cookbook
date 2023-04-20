const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);
app.use(cors());
app.listen(process.env.PORT || 5500);

const { ingredientRouter } = require('./controller/ingredient-controller');
app.use('/api/ingredient', ingredientRouter);

const { recipeRouter } = require('./controller/recipe-controller');
app.use('/api/recipe', recipeRouter);
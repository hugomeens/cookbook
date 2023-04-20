const { db } = require('./db');

class IngredientDao {
    constructor(collectionName) {
        this.collection;

        this._init(collectionName);
    }

    async _init(collectionName) {
        this.collection = await db.collection(collectionName);
    }

    create(ingredient) {
        this.collection.insert(ingredient);
        return ingredient;
    }

    list() {
        return this.collection.find({}).toArray();
    }
}

const ingredientDao = new IngredientDao('ingredients');

module.exports = { ingredientDao };
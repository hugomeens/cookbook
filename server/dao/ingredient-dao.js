const { db } = require('./db');
const ObjectID = require('mongodb').ObjectID;
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

    async delete(id) {
        return await this.collection.deleteOne({ _id: ObjectID(id) });
    }
}

const ingredientDao = new IngredientDao('ingredients');

module.exports = { ingredientDao };

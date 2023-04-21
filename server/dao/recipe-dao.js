const { db } = require('./db');
const ObjectID = require('mongodb').ObjectID;

class RecipeDao {
    constructor(collectionName) {
        this.collection;

        this._init(collectionName);
    }

    async _init(collectionName) {
        this.collection = await db.collection(collectionName);
    }

    create(ingredient) {
        this.collection.insertOne(ingredient);
        return ingredient;
    }

    list() {
        return this.collection.find({}).toArray();
    }

    async delete(id) {
        return await this.collection.deleteOne({ _id: ObjectID(id) });
    }

    validate(id) {
        return this.collection.updateOne({ _id: ObjectID(id) }, { $set: { valid: true } });
    }

    update(id, up) {
        return this.collection.updateOne({ _id: ObjectID(id) }, { $set: up });

    }
}

const recipeDao = new RecipeDao('recipe');
module.exports = { recipeDao };

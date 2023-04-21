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

    create(recipe) {
        this.collection.insert(recipe);
        return recipe;
    }

    list() {
        return this.collection.find({}).toArray();
    }

    async delete(id) {
        return await this.collection.deleteOne({ _id: ObjectID(id) });
    }

    async validate(id) {
        return await this.collection.update({ _id: ObjectID(id) }, { $set: { valid: true } });
    }

    async update(id, up) {
        return await this.collection.updateOne({_id: ObjectID(id)}, { $set: up});
    }
}

const recipeDao = new RecipeDao('recipes');
module.exports = { recipeDao };

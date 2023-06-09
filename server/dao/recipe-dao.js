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

    async list(offset, limit, search) {
        if (search && search.length > 0) offset = 0;
        else search = '';

        return await this.collection
            .find({ name: { $regex: search, $options: 'i' } })
            .skip(offset)
            .limit(limit)
            .toArray();
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

    view(id) {
        return this.collection.findOne({ _id: ObjectID(id) });
    }
}

const recipeDao = new RecipeDao('recipes');
module.exports = { recipeDao };

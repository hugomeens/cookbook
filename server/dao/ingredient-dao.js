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
        this.collection.insertOne(ingredient);
    }

    list(offset, limit) {
        return this.collection.find({}).skip(offset).limit(limit).toArray();
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

    async view(ingredients) {
        let ingredientsRes = [];
        for (let i = 0; i < ingredients.length; i++) {
            await this.collection.findOne({ _id: ObjectID(ingredients[i]._id) }).then(async (res) => {
                res.quantity = ingredients[i].quantity;
                ingredientsRes.push(res);
            });
        }
        return ingredientsRes;
    }
}

const ingredientDao = new IngredientDao('ingredients');
module.exports = { ingredientDao };

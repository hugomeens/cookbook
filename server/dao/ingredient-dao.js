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

    async view(id) {
        let ingredients = [];
        id.forEach(element => {
            this.collection.findOne({ _id: ObjectID(element) }).then(async (res) => {
                console.log(res);
                await éingredients.push(res);
            });
        });
        return ingredients;
    }
}

const ingredientDao = new IngredientDao('ingredients');
module.exports = { ingredientDao };

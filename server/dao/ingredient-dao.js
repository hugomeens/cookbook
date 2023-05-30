const { db } = require('./db');
const ObjectID = require('mongodb').ObjectID;
class IngredientDao {
    constructor(collectionName) {
        this.collection;

        this._init(collectionName);
    }

    async _init(collectionName) {
        this.collection = await db.collection(collectionName);
        this.collection.createIndex({ alternativeNames: 'text', name: 'text' });
    }

    create(ingredient) {
        this.collection.insertOne(ingredient);
    }

    list(offset, limit) {
        return this.collection.find({ "fusion": { $eq: "" } }).skip(offset).limit(limit).toArray();
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

    async search(search) {
        return await this.collection
            .find({
                $and: [
                    {fusion: ''},
                    {$or: [
                        { name: { $regex: search, $options: 'i' } },
                        { alternativeNames: { $regex: search, $options: 'i' } },
                    ]}],
            })
            .toArray();
    }

    async view(ingredients) {
        let ingredientsRes = [];
        for (let i = 0; i < ingredients.length; i++) {
            await this.collection.findOne({ _id: ObjectID(ingredients[i]._id) }).then(async (res) => {
                while (res.fusion != "") {
                    res = await this.collection.findOne({ _id: ObjectID(res.fusion) });
                }
                res.quantity = ingredients[i].quantity;
                res.valid = ingredients[i].valid;
                ingredientsRes.push(res);
            });
        }
        return ingredientsRes;
    }
}

const ingredientDao = new IngredientDao('ingredients');
module.exports = { ingredientDao };

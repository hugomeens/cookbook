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
        return this.collection.find({"fusion" : { $eq : "" }}).toArray();
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
        for (let i = 0; i < id.length; i++) {
            await this.collection.findOne({ _id: ObjectID(id[i]) }).then(async (res) => {
                while(res.fusion != "") {
                    res = await this.collection.findOne({ _id: ObjectID(res.fusion) });
                }
                ingredients.push(res);
            });
        }
        return ingredients;
    }
}

const ingredientDao = new IngredientDao('ingredients');
module.exports = { ingredientDao };

require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;
const uri = process.env.MONGO_URI;

class Database {
    constructor(_url) {
        this.url = _url;
        this.client;
        this.db;
    }

    async open() {
        this.client = await MongoClient.connect(this.url);
        console.log('Mongodb connected');
        this.db = this.client.db('cookBook');
        return this.db;
    }

    async collection(collection) {
        if (!this.db) await this.open();
        return this.db.collection(collection);
    }
}

const db = new Database(uri);

module.exports = { db };
const MongoClient = require('mongodb').MongoClient;

class Database {
    constructor(_url) {
        this.url = _url;
        this.client;
        this.db;
    }

    async open() {
        this.client = await MongoClient.connect(this.url);
        this.db = this.client.db("cookBook");
        return this.db;
    }

    async collection(collection) {
        if (!this.db) await this.open();
        return this.db.collection(collection);
    }
}

const db = new Database('***REMOVED***');

module.exports = { db };

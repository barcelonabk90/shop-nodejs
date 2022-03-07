/**
 * DB connection initial
 */

const mongodb = require('mongodb');

const config = require('../config');

const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = callback => {
  MongoClient.connect(`mongodb+srv://${config.db.user}:${config.db.pass}@cluster0.1hvb2.mongodb.net/${config.db.name}?retryWrites=true&w=majority`)
    .then(client => {
      // console.log(client);
      _db = client.db();
      callback();
    })
    .catch(err => {
      console.log(err);
      throw err;
    });
}

const getDb = () => {
  if (_db) {
    return _db;
  }

  throw 'No database found!';
}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
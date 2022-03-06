/**
 * DB connection initial
 */

const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = callback => {
  MongoClient.connect('mongodb+srv://shopAdmin:jL2D5k45trGS5Lg5@cluster0.1hvb2.mongodb.net/shop10?retryWrites=true&w=majority')
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
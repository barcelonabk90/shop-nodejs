const mongodb = require('mongodb');
const getDb = require('../util/database').getDb;

class Product {
  constructor(title, price, description, imageUrl, id) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
    this._id = new mongodb.ObjectId(id);
  }

  save() {
    const db = getDb();
    let dbObject;
    if (this._id) {
      dbObject = db.collection('products').updateOne({ _id: new mongodb.ObjectId(this._id) }, { $set: this });
    } else {
      dbObject = db.collection('products').insertOne(this);
    }
    return dbObject.then(result => {
      console.log(result);
    })
      .catch(err => {
        console.log(err);
      });
  }

  static fetchALl() {
    const db = getDb();
    return db
      .collection('products')
      .find()
      .toArray()
      .then(products => {
        return products;
      })
      .catch(err => {
        console.log(err);
      });
  }

  static findById(productId) {
    const db = getDb();
    return db.collection('products').find({ _id: new mongodb.ObjectId(productId) })
      .next()
      .then(product => {
        // console.log(product);
        return product;
      })
      .catch(err => {
        console.log(err);
      });
  }
}

module.exports = Product;

const { get } = require("express/lib/response");
const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = callback => {

  MongoClient.connect(
    "mongodb+srv://quachanhhao:01245312z@cluster0.zs7t6.mongodb.net/shop?retryWrites=true&w=majority"
  )
    .then((client) => {
      console.log("Connected");
      _db = client.db();
      callback();
    })
    .catch((err) => {
      console.log(err);
    });

    const getDb = () => {
      if(_db) {
        return _db;
      }
      else {
        throw 'No Database Found!';
      }
    }
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;

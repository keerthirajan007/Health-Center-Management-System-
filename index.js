const Mongodb = require("mongodb");
const MongoClient = Mongodb.MongoClient;
const uri =
  "mongodb+srv://keerthirajan:Keerthi@2001@cluster0.tv40e.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

async function getProfileId(rollNo, callback) {
  const client = new MongoClient(uri, { useNewUrlParser: true });
  await client.connect();
  const db = client.db("medical");
  const collection = db.collection("user_details");
  collection.findOne({ roll_no: rollNo }, async (err, res) => {
    if (res == null) callback(err, null);
    else callback(err, res["profile_id"]);
  });
}

async function getDetails(id, callback) {
  const client = new MongoClient(uri, { useNewUrlParser: true });
  await client.connect();
  const db = client.db("medical");
  const collection = db.collection("profile_details");
  collection.findOne({ _id: new Mongodb.ObjectID(id) }, async (err, res) => {
    callback(err, res);
  });
}

async function createUser(rollNo, details, callback) {
  const client = new MongoClient(uri, { useNewUrlParser: true });
  await client.connect();
  const db = client.db("medical");
  let collection = db.collection("profile_details");
  collection.insertOne(details, (err, res) => {
    if (err) throw err;
    var id = res.insertedId;
    collection = db.collection("user_details");
    collection.insertOne({ roll_no: rollNo, profile_id: id }, (err, res) => {
      if (err) throw err;
      callback(err, res);
    });
  });
  // client.close();
}

async function modifyUserById(id, newDetails, callback) {
  const client = new MongoClient(uri, { useNewUrlParser: true });
  await client.connect();
  const db = client.db("medical");
  let collection = db.collection("profile_details");
  collection.updateOne(
    { _id: new Mongodb.ObjectID(id) },
    { $set: newDetails },
    (err, res) => {
      if (err) throw err;
      callback(err, res);
    }
  );
}

module.exports = { getDetails, getProfileId, createUser, modifyUserById };

const MongoClient = require("mongodb").MongoClient;
const uri = process.env.DB
  ? process.env.DB
  : "mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass%20Community&ssl=false";
const client = new MongoClient(uri, { useNewUrlParser: true });

module.exports.getBookingCollection = async function getBookingCollection(
  work,
  handleError
) {
  try {
    await client.connect();
    const database = client.db("booking");
    const collection = database.collection("bookings");
    await work(collection);
    //console.log("Done");
  } catch (err) {
    //console.log("ERROR");
    handleError(err);
  } finally {
    // Ensures that the client will close when you finish/error
    //console.log("Cleaning");
    //client.close();
  }
};

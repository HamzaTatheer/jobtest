let db = require("./DBConnection");
let BookingModel = require("../models/Booking");
//returns Array of BookingModel
module.exports.getAllBookings = async function () {
  return new Promise(async (res, rej) => {
    let docs = [];
    await db.getBookingCollection(
      async (collection) => {
        let docs = await collection.find({}).toArray();
        res(docs);
      },
      async (err) => {
        rej(err);
      }
    );
  });
};

module.exports.createBooking = function (
  title,
  details,
  startDate,
  startTime,
  endTime,
  workerName
) {
  return new Promise(async (res, rej) => {
    let myobj = {
      title,
      details,
      startDate,
      startTime,
      endTime,
      workerName,
    };
    await db.getBookingCollection(
      async (collection) => {
        await collection.insertOne(myobj, function (err, result) {
          if (err) {
            rej(err);
          }
          console.log("1 document inserted");
          res(result);
        });
      },
      async (err) => {
        rej(err);
      }
    );
  });
};

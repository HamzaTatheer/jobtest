const { body, validationResult } = require("express-validator");
let BookingModel = require("../models/Booking");
let {
  validateStartDate,
  validateStartTime,
  validateEndTime,
} = require("../validators/BookingValidator");

module.exports = function (app) {
  app.post(
    "/createNewBooking",
    [
      body("title").notEmpty().isString(),
      body("details").isString(),
      validateStartDate,
      validateStartTime,
      validateEndTime,
      body("workerName").notEmpty().isString(),
    ],
    async (req, res) => {
      console.log(req.body);
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status("412").send({ errors });
      }

      console.log("________REACHED CREATE_________");

      const {
        title,
        details,
        startDate,
        startTime,
        endTime,
        workerName,
      } = req.body;

      return BookingModel.createBooking(
        title,
        details,
        startDate,
        startTime,
        endTime,
        workerName
      )
        .then(() => {
          return res.send("Booking Created");
        })
        .catch((err) => {
          console.log(err);
          return res.status("412").send(err);
        });
    }
  );
  app.get("/showAllBookings", (req, res) => {
    return BookingModel.getAllBookings()
      .then((result) => res.send(result))
      .catch((err) => {
        console.log(err);
        res.status("400").send("error");
      });
  });
};

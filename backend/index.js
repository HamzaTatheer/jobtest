require("dotenv").config();
const express = require("express");
var bodyParser = require("body-parser");
const cors = require("./config/cors");
const BookingController = require("./controllers/Booking");
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

cors(app);

//Add different things modularly
BookingController(app);

app.listen("3001", () => {
  console.log("Server started on port 3001");
});

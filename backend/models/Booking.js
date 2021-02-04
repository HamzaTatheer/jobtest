let BookingDb = require("../DB/Booking");

module.exports.getAllBookings = function () {
  return BookingDb.getAllBookings();
};

function validateTitle(item) {
  if (item.length < 0) return false;

  if (item.length > 100) return false;

  return true;
}

function validateDetails(item) {
  if (item.length > 200) return false;

  return true;
}

function validateStartDate(item) {
  const [sy, sm, sd] = item.split("/");
  const todaysDate = new Date();
  const startDate = new Date(sy, sm, sd);

  if (startDate < todaysDate) return false;

  return true;
}

function validateTime(startingTime, endingTime) {
  const [sh, sm, ss] = startingTime.split(":");
  const [eh, em, es] = endingTime.split(":");

  const startTime = new Date(0, 0, 0, sh, sm, ss);
  const endTime = new Date(0, 0, 0, eh, em, es);

  //gives difference in miliseconds
  let diff = endTime - startTime;

  //3600000 is 1 hour
  if (diff > 3600000) return false;

  return true;
}

function validateWorkerName(item) {
  return true;
}

function isTimeConflicting(mybStart, mybEnd, bStart, bEnd) {
  let isConflict = false;
  if ((mybStart >= bStart && mybStart <= bEnd) == true) isConflict = true;

  if ((mybEnd >= bStart && mybEnd <= bStart) === true) isConflict = true;

  return isConflict;
}

module.exports.createBooking = function (
  title,
  details,
  startDate,
  startTime,
  endTime,
  workerName
) {
  return new Promise(async (res, rej) => {
    let errs = [];
    let isDataOkay = true;

    if (!validateTitle(title)) {
      isDataOkay = false;
      errs.push("invalid Title");
    }
    if (!validateDetails(details)) {
      isDataOkay = false;
      errs.push("invalid details");
    }
    if (!validateStartDate(startDate)) {
      isDataOkay = false;
      errs.push("invalid Start Date");
    }
    if (!validateTime(startTime, endTime)) {
      isDataOkay = false;
      errs.push("Appointment can only be of 1 hour");
    }
    if (!validateWorkerName(workerName)) {
      isDataOkay = false;
      errs.push("invalid Worker Name");
    }

    if (isDataOkay === false) {
      rej(errs);
    }

    const [sy, smon, sd] = startDate.split("/");
    const [sh, sm, ss] = startTime.split(":");
    const [eh, em, es] = endTime.split(":");

    const myBookingStartDateTime = new Date(sy, smon, sd, sh, sm, ss);
    const myBookingEndDateTime = new Date(sy, smon, sd, eh, em, es);

    let bookings = null;
    await BookingDb.getAllBookings().then((result) => {
      bookings = result;
    });
    let canCreate = true;

    console.log(bookings);
    bookings.forEach((item) => {
      console.log(item);
      let [temp_sy, temp_smon, temp_sd] = item.startDate.split("/");
      let [temp_sh, temp_sm, temp_ss] = item.startTime.split(":");
      let [temp_eh, temp_em, temp_es] = item.endTime.split(":");

      const BookingStartDateTime = new Date(
        temp_sy,
        temp_smon,
        temp_sd,
        temp_sh,
        temp_sm,
        temp_ss
      );
      const BookingEndDateTime = new Date(
        temp_sy,
        temp_smon,
        temp_sd,
        temp_eh,
        temp_em,
        temp_es
      );
      canCreate = !isTimeConflicting(
        myBookingStartDateTime,
        myBookingEndDateTime,
        BookingStartDateTime,
        BookingEndDateTime
      );
    });

    if (canCreate === false) {
      errs.push("Your Appointment has conflicting time.");
      return rej(errs);
    }

    BookingDb.createBooking(
      title,
      details,
      startDate,
      startTime,
      endTime,
      workerName
    )
      .then(() => res("Booking Created"))
      .catch((err) => {
        rej(err);
      });
  });
};

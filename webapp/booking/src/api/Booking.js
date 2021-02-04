// function getAllBookings() {
//   const Data = [
//     {
//       title: "Fix Door",
//       workerName: "Akram Abas",
//       details:
//         "The door is jammed and makes noise whenever it is opened. It needs to be fixed",
//       date: "3 Feburary 2020",
//       startTime: "10:30",
//       endTime: "11:30",
//     },
//     {
//       title: "Repair TV",
//       workerName: "Waseem Abid",
//       details: "TV shows no channels even though cable is already configured",
//       date: "4 Feburary 2020",
//       startTime: "11:30",
//       endTime: "12:30",
//     },
//   ];

//   return new Promise((res, rej) => {
//     setTimeout(() => {
//       res(Data);
//     }, 3000);
//   });
// }

import axios from "axios";

function getAllBookings() {
  console.log("Fetching All Bookings");
  return new Promise((resolve, reject) => {
    axios
      .get("http://localhost:3001/showAllBookings")
      .then(({ data }) => {
        console.log(data);
        resolve(
          data.map((o) => {
            return {
              title: o.title,
              details: o.details,
              startDate: o.startDate,
              startTime: o.startTime,
              endTime: o.endTime,
              workerName: o.workerName,
            };
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  });
}

function createNewBooking(o) {
  return new Promise((res, rej) => {
    axios
      .post("http://localhost:3001/createNewBooking", {
        title: o.title,
        details: o.details,
        startDate: o.startDate,
        startTime: o.startTime,
        endTime: o.endTime,
        workerName: o.workerName,
      })
      .then((data) => {
        console.log(data);
        res(data);
      })
      .catch((err) => {
        console.log(err.response.data);

        if (err && err.response && err.response.data) {
          if (Array.isArray(err.response.data)) {
            err.response.data.forEach((element) => {
              alert(element);
            });
          }
        }

        rej("Can not Book right now");
      });
  });
}

export { getAllBookings, createNewBooking };

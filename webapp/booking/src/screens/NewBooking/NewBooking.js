import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import withHeader from "../../components/withHeader";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { createNewBooking } from "../../api/Booking";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      display: "flex",
      flexDirection: "column",
    },
  },
  page_heading: {
    color: theme.palette.primary,
  },
  selectPaddingFix: {
    paddingRight: "0px !important",
  },
}));

function NewBooking() {
  const classes = useStyles();

  const [workerIndex, setWorkerIndex] = useState(0);
  let workers = ["Akram Abbas", "Waseem Abid"];

  const [title, setTitle] = useState("");
  const [workerName, setWorkerName] = useState(workers[workerIndex]);
  const [details, setDetails] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [startTime, setStartTime] = useState(null);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleWorkerNameChange = (event) => {
    const value = event.target.value;
    setWorkerIndex(value);
    setWorkerName(workers[value]);
  };

  const handleDetailsChange = (event) => {
    setDetails(event.target.value);
  };
  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };
  const handleStartTimeChange = (event) => {
    setStartTime(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    let complete = true;
    if (title === null || title === "") {
      complete = false;
    }

    if (startDate === null || startDate === "") {
      complete = false;
    }

    if (startTime === null || startTime === "") {
      complete = false;
    }

    if (complete === false) {
      alert("Please Fill in The required fields");
      return;
    }

    let date = startDate.split("-");
    let time = startTime.split(":");
    // console.log({
    //   title,
    //   details,
    //   startDate: date[0] + "/" + date[1] + "/00",
    //   startTime: time[0] + ":" + time[1] + ":00",
    //   endTime: parseInt(time[0]) + 1 + ":" + time[1] + ":00",
    //   workerName,
    // });

    createNewBooking({
      title,
      details,
      startDate: date[0] + "/" + date[1] + "/" + date[2],
      startTime: time[0] + ":" + time[1] + ":0",
      endTime: parseInt(time[0]) + 1 + ":" + time[1] + ":0",
      workerName,
    })
      .then(() => {
        alert("Success");
      })
      .catch((err) => {
        alert(err);
      });
  };

  return (
    <form autoComplete="off">
      <Card>
        <CardContent className={classes.root}>
          <Typography variant="h3" gutterBottom>
            Create New Appointment
          </Typography>
          <TextField
            label="Title"
            variant="outlined"
            onChange={handleTitleChange}
            required
          />
          <TextField
            label="Details"
            variant="outlined"
            onChange={handleDetailsChange}
          />
          <TextField
            id="date"
            label="Appointment Date"
            onChange={handleStartDateChange}
            type="date"
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
            required
          />
          <TextField
            id="time"
            label="Start Time"
            onChange={handleStartTimeChange}
            type="time"
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              step: 300, // 5 min
            }}
            required
          />
          <InputLabel>Choose from available workers</InputLabel>
          <Select
            value={workerIndex}
            label="worker"
            onChange={handleWorkerNameChange}
            classes={{
              select: classes.selectPaddingFix,
            }}
            required
          >
            {workers.map((name, index) => {
              return <MenuItem value={index}>{name}</MenuItem>;
            })}
          </Select>
        </CardContent>
        <CardActions>
          <div style={{ flexGrow: 1 }}></div>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            onClick={handleSubmit}
          >
            Create
          </Button>
        </CardActions>
      </Card>
    </form>
  );
}

export default withHeader(NewBooking);

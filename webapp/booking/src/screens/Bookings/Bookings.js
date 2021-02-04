import { useState, useEffect } from "react";
import withHeader from "../../components/withHeader";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Card from "./components/Card";

import { getAllBookings } from "../../api/Booking";

const useStyles = makeStyles((theme) => ({
  header: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    marginBottom: "9vh",
  },
  root: {
    marginTop: "50px",
  },
  content: {
    borderLeft: "1px solid #c3c3c3",
    marginLeft: "40px",
    marginRight: "10px",
    marginBottom: "100px",
    paddingLeft: "30px",
    paddingTop: "5px",
    paddingBottom: "30px",
  },
  CardContainer: {
    minWidth: 275,
  },
}));

function Bookings(props) {
  let styles = useStyles();
  const [Data, setData] = useState([]);

  useEffect(() => {
    console.log("Finding");
    getAllBookings().then((response) => {
      setData(response);
    });
  }, []);

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <div>
          <Typography variant="h5">Your Bookings</Typography>
        </div>
        <Button
          variant="contained"
          color="primary"
          style={{ background: "#0FD693", borderRadius: "20px" }}
          onClick={() => props.history.push("/NewBooking")}
        >
          Create New
        </Button>
      </div>

      <div className={styles.content}>
        {Data.length == 0
          ? "Loading.."
          : Data.map((item, index) => (
              <Card
                key={index}
                title={item.title}
                workerName={item.workerName}
                startTime={item.startTime}
                endTime={item.endTime}
                date={item.startDate}
                details={item.details}
              />
            ))}
      </div>
    </div>
  );
}

export default withHeader(Bookings);

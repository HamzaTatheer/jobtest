import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Collapse from "@material-ui/core/Collapse";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
    marginBottom: "30px",
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
}));

export default function ({
  key,
  title,
  workerName,
  startTime,
  endTime,
  date,
  details,
}) {
  let styles = useStyles();

  console.log(date);
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card key={key != null ? key : 0} className={styles.root}>
      <CardContent>
        <Typography variant="h5">{title}</Typography>

        <Typography variant="subtitle1" color="textSecondary" gutterBottom>
          {workerName}
        </Typography>
      </CardContent>
      <CardActions>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexGrow: 1,
          }}
        >
          <div style={{ paddingLeft: "8px" }}>
            <Typography
              variant="body1"
              gutterBottom
              color="textPrimary"
              style={{ color: "#456DC9" }}
            >
              {startTime} - {endTime}
            </Typography>
            <Typography variant="body2" gutterBottom>
              {date}
            </Typography>
          </div>
          <div>
            <IconButton
              className={clsx(styles.expand, {
                [styles.expandOpen]: expanded,
              })}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </IconButton>
          </div>
        </div>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>{details}</CardContent>
      </Collapse>
    </Card>
  );
}

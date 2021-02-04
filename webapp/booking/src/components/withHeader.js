import Header from "./Header/Header";
import Grid from "@material-ui/core/Grid";

export default function (Component) {
  return (props) => {
    return (
      <>
        <Header />
        <Grid container>
          <Grid item xs={1} sm={1} md={2} />
          <Grid item xs={12} sm={10} md={8}>
            <Component {...props} />
          </Grid>
          <Grid item xs={1} sm={1} md={2} />
        </Grid>
      </>
    );
  };
}

import { Route, Switch } from "react-router-dom";

import Bookings from "./screens/Bookings/Bookings";
import NewBooking from "./screens/NewBooking/NewBooking";

function App() {
  return (
    <main>
      <Switch>
        <Route path={["/", "/Bookings"]} component={Bookings} exact />
        <Route path={["/", "/NewBooking"]} component={NewBooking} exact />
      </Switch>
    </main>
  );
}

export default App;

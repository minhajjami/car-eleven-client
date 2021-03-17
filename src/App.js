import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import AddCar from "./Components/AddCar/AddCar";
import CarDetails from './Components/Cars/CarDetails';
import Home from './Components/Home/Home';
import NavBar from "./Components/NavBar/NavBar";
import NotFound from "./Components/NotFound/NotFound";

function App() {
  return (
    <Router>
      <NavBar />
      <Switch>
        <Route exact path='/'>
          <Home />
        </Route>
        <Route path='/details/:id'>
          <CarDetails/>
        </Route>
        <Route path='/addCar'>
          <AddCar/>
        </Route>
        <Route path='*'>
          <NotFound />
        </Route>
      </Switch> 
    </Router>
  );
}

export default App;

import "./App.css";
import Home from "./components/Home";
import Navbar from "./components/Navbvar";

import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'


function App() {
  return (
    <Router className="App">
      <Navbar/>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
      </Switch> 
    </Router> 
  );
}

export default App;

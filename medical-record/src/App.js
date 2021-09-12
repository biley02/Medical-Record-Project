import "./App.css";
import Home from "./components/Home";
import Navbar from "./components/Navbvar";
import UserSignUp from './components/UserSignUp'

import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'


function App() {
  return (
    <Router className="App">
      <Navbar/>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/user/login">
          <UserSignUp/>
        </Route>
      </Switch> 
    </Router> 
  );
}

export default App;

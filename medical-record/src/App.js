import "./App.css";
import Home from "./components/Home";
import Navbar from "./components/Navbvar";
import UserSignUp from "./components/UserSignUp";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import UserSignIn from "./components/UserSignIn";
import Footer from "./components/Footer";
import UserSideComponent from "./components/UserSideComponent";

function App() {
  return (
    <Router className="App">
      <Navbar />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>

        <Route path="/user/signup">
          <UserSignUp />
        </Route>
        <Route path="/user/login">
          <UserSignIn />
        </Route>
      </Switch>
      <Route path="/user/profile">
        <UserSideComponent/>
      </Route>
      <Footer>
      </Footer>
    </Router>
  );
}

export default App;

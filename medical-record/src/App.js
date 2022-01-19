import "./App.css";
import Home from "./components/Home";
import Navbar from "./components/Navbvar";
import UserSignUp from "./components/UserSignUp";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import UserSignIn from "./components/UserSignIn";
import Footer from "./components/Footer";
import UserSideComponent from "./components/UserSideComponent";
import UserDiseaseComponent from "./components/UserDiseaseComponent";
import DiseaseContent from "./components/DiseaseContent";
import HospitalSignIn from "./components/HospitalSignIn";
import HospitalSignUp from "./components/HospitalSignUp";
import HospitalProfile from "./hospitalComponents/profile";
import HospitalPatient from "./hospitalComponents/HospitalPatient";
import UserHospital from "./components/UserHospital";

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
        <Route path="/user/profile">
          <UserSideComponent />
        </Route>
        <Route path="/user/disease">
          <UserSideComponent />
        </Route>
        <Route path="/user/hospital">
          <UserSideComponent />
        </Route>
        {/* hospital routes */}
        <Route path="/hospital/login">
          <HospitalSignIn />
        </Route>
        <Route path="/hospital/signup">
          <HospitalSignUp />
        </Route>
        <Route path="/hospital/profile">
          <HospitalProfile />
        </Route>
        <Route path="/hospital/patient">
          <HospitalProfile />
        </Route>
        <Route path="/hospital/diseases">
          <HospitalProfile />
        </Route>
      </Switch>

      <Footer />
    </Router>
  );
}

export default App;

import React from "react";
import "./App.css";
import { Switch } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Travel from "./pages/Travel";
import Home from "./pages/Home";
import PrivateRoute from "./components/PrivateRoute";
import AnonRoute from "./components/AnonRoute";
import AuthProvider from "./lib/Services/AuthProvider";
import Navbar from "./components/Navbar";
import CreateTravel from "./pages/CreateTravel";
import { ServiceProvider } from "./lib/Services/ServicesProvider";
import TravelDetails from "./components/TravelDetails";
import Profile from './pages/Profile'
import EditProfile from './pages/EditProfile'
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <AuthProvider>
      <div className="Container">
        <Navbar />
        <Switch>
          <AnonRoute exact path="/" component={Home} />
          <AnonRoute exact path="/signup" component={Signup} />
          <AnonRoute exact path="/login" component={Login} />
          <ServiceProvider>
            <Switch>
              <PrivateRoute exact path="/travel" component={Travel} />

              <PrivateRoute exact path="/travel/create" component={CreateTravel}/>
              <PrivateRoute exact path="/travel/:id" component={TravelDetails} />
              <PrivateRoute exact path='/profile/:id' component={Profile}/>
              <PrivateRoute exact path='/profile/:id/dashboard' component={Dashboard}/>
              <PrivateRoute exact path='/profile/edit/:id' component={EditProfile}/>
            </Switch>
          </ServiceProvider>
        </Switch>
      </div>
    </AuthProvider>
  );
}

export default App;

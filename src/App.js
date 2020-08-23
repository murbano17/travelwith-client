import React from "react";
import "./App.css";
import AuthProvider from "./lib/Services/AuthProvider";
import { Switch, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Travel from "./pages/Travel";
import Home from "./pages/Home";
import PrivateRoute from "./components/PrivateRoute";
import AnonRoute from "./components/AnonRoute";
import ServiceProvider from "./lib/Services/ServicesProvider";

function App() {
  return (
    <AuthProvider>
      <ServiceProvider>
        <div className="Container">
          <Switch>
            <AnonRoute exact path="/" component={Home} />
            <AnonRoute exact path="/signup" component={Signup} />
            <AnonRoute exact path="/login" component={Login} />
            <Route exact path="/travel" component={Travel} />
          </Switch>
        </div>
      </ServiceProvider>
    </AuthProvider>
  );
}

export default App;

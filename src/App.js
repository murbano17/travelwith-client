import React from "react";
import "./App.css";
import AuthProvider from "./lib/Services/AuthProvider";
import { Switch, Route } from "react-router-dom";
import Signup from "./pages/Signup"
import Login from "./pages/Login"
import AnonRoute from "./components/AnonRoute";

function App() {
  return(
  <AuthProvider>
    <div className="Container">

    <Switch>
    <AnonRoute exact path="/signup" component={Signup}/>
    <AnonRoute exact path="/login" component={Login}/>

    </Switch>

    </div>
  </AuthProvider>
  )
}

export default App;

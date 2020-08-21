import React from "react";
import "./App.css";
import AuthProvider from "./lib/Services/AuthProvider";
import { Switch, Route } from "react-router-dom";
import Signup from "./pages/Signup"

function App() {
  return(
  <AuthProvider>
    <div className="Container">

    <Switch>
    <Route exact path="/signup" component={Signup}/>

    </Switch>

    </div>;
  </AuthProvider>
  )
}

export default App;

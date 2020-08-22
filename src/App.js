import React from "react";
import "./App.css";
import AuthProvider from "./lib/Services/AuthProvider";
import { Switch } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import AnonRoute from "./components/AnonRoute";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
// import PrivateRoute from './components/PrivateRoute'

function App() {
  return (
    <AuthProvider>
      <div className="Container">
        <Switch>
          <AnonRoute exact path="/" component={Home} />
          <AnonRoute exact path="/signup" component={Signup} />
          <AnonRoute exact path="/login" component={Login} />
        </Switch>
      </div>
    </AuthProvider>
  );
}

export default App;

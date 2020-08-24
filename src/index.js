import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
// import $ from "jquery";
// import Popper from "popper.js";
import "bootstrap/dist/js/bootstrap.bundle.min";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
// import { ServiceProvider } from "./lib/Services/ServicesProvider";

ReactDOM.render(
  <Router>
    <App />
  </Router>,

  document.getElementById("root")
);

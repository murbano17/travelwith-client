import React from "react";
import "../components/HomeScript";
import { Link } from "react-router-dom";
import "../styles/Home.css";

function Home() {
  return (
    <div className="home-container">
      <div className="home-header">
        <h1>
          Welcome to <br />
          Travel With,
        </h1>
        <h3>your best friend for organize every travel with (new) friends</h3>
        <div className="btn-home-container">
          <Link to={"/login"}>
            <button type="submit" className=" button btn-login">
              Login
            </button>
          </Link>
          <Link to={"/signup"}>
            <button type="submit" className=" button-home">
              Sign up
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
export default Home;

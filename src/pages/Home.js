import React from "react";
import "../components/HomeScript";
import Carousel from "../components/Carousel";
import { Link } from "react-router-dom";
// import Navbar from "../components/Navbar";

function Home() {
  return (
    <div className="home-container">
      <Carousel />
      <div
        className="btn-home-container"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "2rem",
        }}
      >
        <Link to={"/login"}>
          <button
            type="submit"
            style={{ margin: "1rem 2rem", width: "20rem" }}
            className="btn btn-secondary"
          >
            Login
          </button>
        </Link>
        <Link to={"/signup"}>
          <button
            type="submit"
            style={{ margin: "1rem 2rem", width: "20rem" }}
            className="btn btn-secondary"
          >
            Sign up
          </button>
        </Link>
      </div>
    </div>
  );
}
export default Home;

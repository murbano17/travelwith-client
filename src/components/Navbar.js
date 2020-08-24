import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withAuth } from "../lib/Services/AuthProvider";

class Navbar extends Component {
  // constructor(props)  {
  //     super(props);
  //     this.state = {

  //     }
  // }

  render() {
    const { user, logout, isLoggedin } = this.props;
    return (
      <nav className="navbar-container">
        <Link to={"/"} id="home-btn">
          <h4>Travelwith</h4>
        </Link>
        {isLoggedin ? (
          <ul>
            <li>
              <Link to={"/travel"}>Find a travel</Link>
            </li>
            <li>
              <Link to={`/profile/${user._id}/dashboard`}>Dashboard</Link>
            </li>
            <li>
              <Link to={`/profile/${user._id}`}>Profile</Link>
            </li>
            <li>
              <Link to={"/travel/create"}>Create your travel</Link>
            </li>
            <li>
              <p>
                {user.username}
                <button onClick={logout}>Logout</button>
              </p>
            </li>
          </ul>
        ) : (
          <ul>
            <li>
              <Link to={"/login"}>Login</Link>
            </li>
            <li>
              <Link to={"/signup"}>Signup</Link>
            </li>
          </ul>
        )}
      </nav>
    );
  }
}

export default withAuth(Navbar);

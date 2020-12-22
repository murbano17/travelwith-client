import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withAuth } from "../lib/Services/AuthProvider";

class Navbar extends Component {
  constructor(props)  {
      super(props);
      this.state = {
        isNavbarCollapse: true,
      }
  }

  cloneNavbar = (e) => {
    let updateNavBarMode = !this.state.isNavbarCollapse
    this.setState({isNavbarCollapse: updateNavBarMode})
  }

  render() {
    const { user, logout, isLoggedin } = this.props;
    
    return (
      <nav className="navbar navbar-expand-lg navbar-light navbar-custom ">
        <button
          className="custom-toggler navbar-toggler button-navbar"
          type="button"
          data-toggle="collapse"
          data-target="#navbarTogglerDemo03"
          aria-controls="navbarTogglerDemo03"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className=" navbar-toggler-icon icon-navbar"></span>
        </button>
        <Link to={"/"} className="navbar-brand ">
          <img className="logo-navbar" src="../../images/logo.png" alt="logo" />
        </Link>
        {isLoggedin ? (
          <div className="collapse navbar-collapse" data-toggle="collapse" data-target="#navbarTogglerDemo03" id="navbarTogglerDemo03">
            <ul className="navbar-nav mr-auto mt-2 mt-lg-0 ulnavbar">
              <li className="nav-item">
                <Link className="nav-link" to={"/travel"} >
                  Find a travel
                  <span className='span-link'></span>
                </Link>
               
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to={`/profile/${user._id}/dashboard`}
                >
                  Dashboard
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={`/profile/${user._id}`}>
                  Profile
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/travel/create"}>
                  Create your travel
                </Link>
              </li>
              <li className="nav-item image-navbar">
                <Link to={`/profile/${user._id}`}>
                  <img src={user.profilePic} alt='profile pic miniature'/>
                </Link>
              </li>
              <li className="nav-item image-navbar">
                <p onClick={logout}>
                  <i className="fas fa-sign-out-alt icon" />
                </p>
              </li>
            </ul>
          </div>
        ) : (
          <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
            <ul className="navbar-nav mr-auto mt-2 mt-lg-0 ulnavbar">
              <li className="nav-item">
                <Link className="nav-link" to={"/login"}>
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/signup"}>
                  Signup
                </Link>
              </li>
            </ul>
          </div>
        )}
      </nav>
    );
  }
}

export default withAuth(Navbar);

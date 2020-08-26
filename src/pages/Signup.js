import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withAuth } from "../lib/Services/AuthProvider";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
      profilePic: "",
      userFrom: "",
      userBirthdate: "",
      about: "",
      invitationCode: "",
    };
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    const {
      username,
      email,
      password,
      profilePic,
      userFrom,
      userBirthdate,
      about,
      invitationCode,
    } = this.state;

    this.props.signup({
      username,
      email,
      password,
      profilePic,
      userFrom,
      userBirthdate,
      about,
      invitationCode,
    });
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <div className='signup-container'>
       <div className="container-form">
        <h1>Sign up!</h1>
        <form onSubmit={this.handleFormSubmit} encType="multipart/form-data">
          <div className="form-group">
            <label>
              <b>Username:</b>
            </label>
            <input
              className="form-control"
              type="text"
              name="username"
              value={this.username}
              onChange={this.handleChange}
            />
          </div>

          <div className="form-group">
            <label>
              <b>Email:</b>
            </label>
            <input
              className="form-control"
              type="text"
              name="email"
              value={this.email}
              onChange={this.handleChange}
            />
          </div>

          <div className="form-group">
            <label>
              <b>Password:</b>
            </label>
            <input
              className="form-control"
              type="password"
              name="password"
              value={this.password}
              onChange={this.handleChange}
            />
          </div>

          <div className="form-group">
            <label>
              <b>Profile picture:</b>
            </label>
            <input
              className="form-control"
              type="file"
              name="profilePic"
              value={this.profilePic}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <label>
              <b>From:</b>
            </label>
            <input
              className="form-control"
              type="text"
              name="userFrom"
              value={this.userFrom}
              onChange={this.handleChange}
            />
          </div>

          <div className="form-group">
            <label>
              <b>Birthdate:</b>
            </label>
            <input
              className="form-control"
              type="Date"
              name="userBirthdate"
              value={this.userBirthdate}
              onChange={this.handleChange}
            />
          </div>

          <div className="form-group">
            <label>
              <b>About:</b>
            </label>
            <input
              className="form-control"
              type="text-area"
              name="about"
              value={this.about}
              onChange={this.handleChange}
            />
          </div>

          <div className="form-group">
            <input
              className="form-control"
              type="hidden"
              name="invitationCode"
              value={this.invitationCode}
              onChange={this.handleChange}
            />
          </div>
          <input type="submit" value="Sign up" className="btn btn-secondary" />
        </form>
        <p className="account">
          Already have account? <Link to={"/login"}> Log in</Link>
        </p>
      </div>
      </div>
    );
  }
}

export default withAuth(Signup);

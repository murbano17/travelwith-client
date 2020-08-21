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
      <div>
        <h1>Sign Up!</h1>
        <form onSubmit={this.handleFormSubmit} encType="multipart/form-data">
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={this.username}
            onChange={this.handleChange}
          />

          <label>Email:</label>
          <input
            type="text"
            name="email"
            value={this.email}
            onChange={this.handleChange}
          />

          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={this.password}
            onChange={this.handleChange}
          />

          <label>Profile picture:</label>
          <input
            type="file"
            name="profilePic"
            value={this.profilePic}
            onChange={this.handleChange}
          />

          <label>From:</label>
          <input
            type="text"
            name="userFrom"
            value={this.userFrom}
            onChange={this.handleChange}
          />

          <label>Birthdate:</label>
          <input
            type="Date"
            name="userBirthdate"
            value={this.userBirthdate}
            onChange={this.handleChange}
          />

          <label>About:</label>
          <input
            type="text-area"
            name="about"
            value={this.about}
            onChange={this.handleChange}
          />

          <input
            type="hidden"
            name="invitationCode"
            value={this.invitationCode}
            onChange={this.handleChange}
          />

          <input type="submit" value="Sign Up" />
        </form>
        <p>Already have account? <Link to={"/login"}>Log in</Link></p>
        
      </div>
    );
  }
}

export default withAuth(Signup);

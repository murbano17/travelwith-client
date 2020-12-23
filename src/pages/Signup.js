import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withAuth } from "../lib/Services/AuthProvider";
import { isEmail } from "validator";

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
      messageError: "",
      successMessage: "",
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

    const validationForm = this.isFormValid();

    if (validationForm) {
      setTimeout(() => {
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
      }, 2500);
    }
  };
  isFormValid = () => {
    if (this.state.username.trim().length === 0) {
      this.setState({ messageError: "Name is required" });
      return false;
    } else if (!isEmail(this.state.email)) {
      this.setState({ messageError: "Email is not valid" });
      return false;
    } else if (this.state.password <= 5) {
      this.setState({
        messageError:
          "Password is not valid. The minimum password length is 6 characters. ",
      });
      return false;
    }
    this.setState({ messageError: "" });
    this.setState({ successMessage: "Your Sign up is completed!" });
    return true;
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  handlePictureClick = () => {
    document.querySelector("#fileSelectorSignUp").click();
  };

  render() {
    return (
      <div className="signup-container">
        <div className="container-form container-form-signup">
          <h1>Get started</h1>
          <h4>Create an account</h4>
          {this.state.messageError.length > 0 ? (
            <div className="oaerror danger">
              <strong>Error</strong> - {this.state.messageError}.
            </div>
          ) : null}

          {this.state.successMessage.length > 0 ? (
            <div className="oaerror success">
              <strong>Success</strong> - {this.state.successMessage}
            </div>
          ) : null}

          <form onSubmit={this.handleFormSubmit} encType="multipart/form-data" className='form-signup'>
            <div className="form-group">
              <label>
                <b>Username*</b>
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
                <b>Email*</b>
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
                <b>Password*</b>
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
                style={{ display: "none" }}
                id="fileSelectorSignUp"
                type="file"
                name="profilePic"
                value={this.profilePic}
                onChange={this.handleChange}
              />
              <input
                className="form-control image-input"
                onClick={this.handlePictureClick}
                placeholder="Upload file"
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
            <button type="submit" className="button">
              Sign up
            </button>
          </form>
          <p className="account">
            Already a member?
            <Link className="link" to={"/login"}>
              Log in
            </Link>
          </p>
        </div>
      </div>
    );
  }
}

export default withAuth(Signup);

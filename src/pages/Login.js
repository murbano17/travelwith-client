import React, { Component } from "react";
import { withAuth } from "../lib/Services/AuthProvider";
import { Link } from "react-router-dom";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      messageError: "",
    };
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    const { email, password } = this.state;

    const validationForm = this.isFormValid();
    if (validationForm) {
      this.props.login({ email, password });
    }
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };
  isFormValid = () => {
    if (this.state.email.trim().length === 0) {
      this.setState({ messageError: "Name is required" });
      return false;
    } else if (this.state.password.trim().length === 0) {
      this.setState({
        messageError: "Password is required",
      });
      return false;
    }
    this.setState({ messageError: "" });
    return true;
  };

  render() {
    return (
      <div className="login-container">
        <div className="container-form">
          <h1>Welcome,</h1>
          <h4>Sign in to continue </h4>
          {this.state.messageError.length > 0 ? (
            <div className="oaerror danger">
              <strong>Error</strong> - {this.state.messageError}.
            </div>
          ) : null}
          {this.props.message.length > 0 ? (
            <div className="oaerror danger">
              <strong>Error</strong> - {this.props.message}.
            </div>
          ) : null}
          <form onSubmit={this.handleFormSubmit}>
            <div className="form-group">
              <label>
                <b>Email*</b>
              </label>
              <input
                className="form-control"
                name="email"
                type="text"
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
                name="password"
                type="password"
                value={this.password}
                onChange={this.handleChange}
              />
            </div>
            <button type="submit" className="button">
              <span>Sign in</span>
            </button>
          </form>
          <p className="account">
            Don't have an account?
            <Link className="link" to={"/signup"}>
              Create one
            </Link>
          </p>
        </div>
      </div>
    );
  }
}

export default withAuth(Login);

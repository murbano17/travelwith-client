import React, { Component } from "react";
import { withAuth } from "../lib/Services/AuthProvider";
import { Link } from "react-router-dom";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    const { email, password } = this.state;
    this.props.login({ email, password });
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  render() {
    return (
      <div className="login-container">
        <h1>Login</h1>
        <form onSubmit={this.handleFormSubmit}>
          <div className="form-group">
            <label>
              <b>Email</b>
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
              <b>Password</b>
            </label>
            <input
              className="form-control"
              name="password"
              type="password"
              value={this.password}
              onChange={this.handleChange}
            />
          </div>
          <input type="submit" value="Login" className="btn btn-secondary" />
        </form>
        <p className="account">
          Don't have an account?  
          <Link className="link" to={"/signup"}> Create one
          </Link>
        </p>
      </div>
    );
  }
}

export default withAuth(Login);

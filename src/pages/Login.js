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
          <label>Email</label>
          <input
            name="email"
            type="text"
            value={this.email}
            onChange={this.handleChange}
          />
          <label>Password</label>
          <input
            name="password"
            type="password"
            value={this.password}
            onChange={this.handleChange}
          />

          <input type="submit" value="Login" />
        </form>
        <p>
          Don't have an account? <Link to={"/signup"}> Create one</Link>
        </p>
      </div>
    );
  }
}

export default withAuth(Login);

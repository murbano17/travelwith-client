import React, { Component } from "react";
import { withAuth } from "../lib/Services/AuthProvider";

class InviteInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emailInvite: "",
    };
  }

  handleChange = (event) => {
    let { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleFormSubmit = (event) => {
    event.preventDefault();
    const { emailInvite } = this.state;

    this.props.createInvitation({});

    this.props.history.push(`/profile/${this.state.userId}`);
  };

  render() {
    return (
      <div>
        <h2>Invite a friend</h2>
        <form onSubmit={this.handleFormSubmit}></form>
        <input
          type="text"
          name="inputInvite"
          value={this.state.emailInvite}
          onChange={this.handleChange}
        />
        <input type="submit" value="Send Invites" />
      </div>
    );
  }
}

export default withAuth(InviteInput);

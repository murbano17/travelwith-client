import React, { Component } from "react";
import { withAuth } from "../lib/Services/AuthProvider";

class InviteInput extends Component {
  constructor() {
    super();
    this.state = {
      inputInvite: "",
    };
  }

  handleChange = (event) => {
    let { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <div>
        <div id="tags">
          <input
            type="text"
            name='inputInvite'
            value={this.state.inputInvite}
            onChange={this.handleChange}
          />
          {/* <input type="submit" value='Send Invites'/> */}
        </div>
      </div>
    );
  }
}

export default withAuth(InviteInput);

import React, { Component } from "react";
import { withAuth } from "../lib/Services/AuthProvider";

class InviteInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emailInvite: "",
      isMessageShown: false,
    };
  }

  componentDidUpdate = (prevProps, prevState) => {
    return this.state.isMessageShown
      ? (this.hideMessage = setTimeout(() => {
          this.setState(() => ({ isMessageShown: false }));
        }, 3000))
      : null;
  };
  componentWillUnmount = () => {
    clearTimeout(this.hideMessage);
  };

  showMessage = () => {
    let messageUpdated = !this.state.isMessageShown;
    this.setState({ isMessageShown: messageUpdated });
  };
  /* 
  showMessage = (e) => {
    this.changeState();
    setTimeout(() => this.setState(this.changeState), 5000);
  };

  changeState = () => {
    let messageUpdated = !this.state.isMessageShown;
    this.setState({ isMessageShown: messageUpdated });
  }; */

  handleChange = (event) => {
    let { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleFormSubmit = (event) => {
    event.preventDefault();
    const { emailInvite } = this.state;
    const travel = this.props.travel;

    this.props.createInvitation(travel, emailInvite);
    this.setState({ emailInvite: "" });
  };

  render() {
    return (
      <div className="invite-input">
        <h2>Invite a friend</h2>
        <form onSubmit={this.handleFormSubmit}>
          <input
            type="text"
            className="input-email"
            className="form-control"
            name="emailInvite"
            value={this.state.emailInvite}
            onChange={this.handleChange}
            placeholder="email@email.com"
          />
          <input
            className="btn btn-secondary send-invitation-btn"
            type="submit"
            value="Send Invites"
            onClick={(e) => this.showMessage(e)}
          />
        </form>
        <div className="invitation-message">
          {this.state.isMessageShown ? (
            <p>Invitation sent successfully</p>
          ) : null}
        </div>
      </div>
    );
  }
}

export default withAuth(InviteInput);

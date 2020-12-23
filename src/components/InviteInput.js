import React, { Component } from "react";
import { withAuth } from "../lib/Services/AuthProvider";
import { isEmail } from "validator";

class InviteInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emailInvite: "",
      isMessageShown: false,
      messageError: "",
      sucessMessage: "",
    };
  }

  handleChange = (event) => {
    let { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleFormSubmit = (event) => {
    event.preventDefault();
    const { emailInvite } = this.state;
    const travel = this.props.travel;
    const validationForm = this.isFormValid();
    if (validationForm) {
      setTimeout(() => {
        this.props.createInvitation(travel, emailInvite);
        this.setState({ emailInvite: "" });
      }, 2500);
    }
  };

  isFormValid = () => {
    if (!isEmail(this.state.emailInvite)) {
      this.setState({ messageError: "Email is not valid" });
      return false;
    }
    this.setState({ messageError: "" });
    this.setState({ sucessMessage: "Invitation sent successfully" });
    return true;
  };

  render() {
    return (
      <div>
        <div className="invite-input">
          <h2>Invite a friend</h2>

          <form onSubmit={this.handleFormSubmit}>
            {this.state.messageError.length > 0 ? (
              <div className="oaerror danger">
                <strong>Error</strong> - {this.state.messageError}.
              </div>
            ) : null}
            {this.state.sucessMessage.length > 0 ? (
              <div className="oaerror success">
                <strong>Success</strong> - {this.state.sucessMessage}.
              </div>
            ) : null}
            <input
              type="text"
              className="input-email form-control"
              name="emailInvite"
              value={this.state.emailInvite}
              onChange={this.handleChange}
              placeholder="email@email.com"
            />
            <input className="button" type="submit" value="Send Invites" />
          </form>
          <div className="invitation-message"></div>
        </div>
      </div>
    );
  }
}

export default withAuth(InviteInput);

import React, { Component } from "react";
import { withAuth } from "../lib/Services/AuthProvider";
import "../styles/Dashboard.css";

class NotificationPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      invitationToShow: [],
    };
  }

  componentDidMount() {
    this.getInvites();
  }

  getInvites = () => {
    return this.props
      .getInviteList()
      .then((res) =>
        res.filter(
          (eachInvite) => eachInvite.guestEmail === this.props.user.email
        )
      )
      .then((filt) => this.setState({ invitationToShow: filt }))
      .catch((err) => console.log("Error ", err));
  };

  handleAccept = (e, travel, invite) => {
    return this.props
      .joinTravel(travel)
      .then(() => this.props.deleteInvite(invite))
      .then(() => this.getInvites())
      .catch((err) => console.log("Error ", err));
  };

  handleDecline = (e, invite) => {
    return this.props
      .deleteInvite(invite)
      .then(() => this.getInvites())
      .catch((err) => console.log("error", err));
  };

  render() {
    return (
      <div className='notifications-panel'>
          {this.state.invitationToShow.length >= 1 ? (
            this.state.invitationToShow.map((eachInvitation) => {
              return (
                <div className="travel-card">
                  <div className="img-card">
                    <img
                      src={eachInvitation.inviteTo.coverPic}
                      className="card-img-top"
                      alt="travelpic"
                    />
                  </div>
                  <div className="card-travel-body">
                    <h5 className="card-travel-title">
                      {eachInvitation.inviteTo.travelName}
                    </h5>
                    <hr />
                    <p className="card-travel-destination">
                      {eachInvitation.inviteTo.origin} -{" "}
                      {eachInvitation.inviteTo.destination}
                    </p>
                    <p className="card-travel-date">
                      <i className="far fa-calendar-plus"></i>{" "}
                      {eachInvitation.inviteTo.startDate} -{" "}
                      {eachInvitation.inviteTo.endDate}
                    </p>
                  </div>

                  <button
                    className="accept-invitation"
                    onClick={(e) =>
                      this.handleAccept(
                        e,
                        eachInvitation.inviteTo,
                        eachInvitation
                      )
                    }
                  >
                    Accept
                  </button>
                  <button
                    className="delete-invitation"
                    onClick={(e) => this.handleDecline(e, eachInvitation)}
                  >
                    Decline
                  </button>
                </div>
              );
            })
          ) : (
            <p className='no-notifications'>You don't have invitations</p>
          )}
      </div>
    );
  }
}

export default withAuth(NotificationPanel);

import React, { Component } from "react";
import { withAuth } from "../lib/Services/AuthProvider";
import { Link } from "react-router-dom";

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
          (eachInvite) => eachInvite.guestEmail == this.props.user.email
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
      <div>
        <ul>
          {this.state.invitationToShow &&
            this.state.invitationToShow.map((eachInvitation) => {
              return (
                <div
                  style={{ textDecoration: "none", color: "black" }}
                  key={eachInvitation._id}
                >
                  <div className="card" style={{ width: "18rem" }}>
                    <img
                      src={eachInvitation.inviteTo.coverPic}
                      className="card-img-top"
                      alt="..."
                    />
                    <div className="card-body">
                      <h5 className="card-title">
                        {eachInvitation.inviteTo.travelName}
                      </h5>
                      <p className="card-text">
                        Origin: {eachInvitation.inviteTo.origin}
                      </p>
                      <p className="card-text">
                        Destination: {eachInvitation.inviteTo.destination}
                      </p>
                      <div>
                        <button
                          className="btn btn-secondary accept-invitation"
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
                          className="btn btn-secondary delete-invitation"
                          onClick={(e) => this.handleDecline(e, eachInvitation)}
                        >
                          Decline
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </ul>
      </div>
    );
  }
}

export default withAuth(NotificationPanel);

import React, { Component } from "react";
// import { withServices } from "../lib/Services/ServicesProvider";
import { Link } from "react-router-dom";
import { withAuth } from "../lib/Services/AuthProvider";
import InviteInput from "./InviteInput";
import "../styles/TravelDetails.css";
import "../styles/Card.css";

export class TravelDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      travelId: props.match.params.id,
      travelToShow: "",
      userToShow: "",
    };
  }
  componentDidMount() {
    this.getTravel();
    this.getUser(this.props.user._id);
  }

  getTravel = () => {
    return this.props
      .getTravel(this.state.travelId)
      .then((res) => this.setState({ travelToShow: res }))
      .catch((err) => console.log(err));
  };

  getUser = () => {
    return this.props
      .findUser(this.props.user._id)
      .then((res) => this.setState({ userToShow: res }))
      .catch((err) => console.log(err));
  };

  handleAccept = (e, travel) => {
    return this.props
      .joinTravel(travel)
      .then(() => this.getTravel())
      .then(() => this.getUser())
      .catch((err) => console.log("Error ", err));
  };

  render() {
    const travel = this.state.travelToShow;
    return (
      <div>
        {travel && (
          <div className="travel-details-container">
            <div className="arrow-back">
              <Link to={`/travel`}>
                <i className="fas fa-arrow-left"></i> Go back
              </Link>
            </div>
            <div className="card-details-travel">
              <div className="img-container">
                <img
                  src={travel.coverPic}
                  className="card-img-top"
                  alt="cover travel pic"
                />
              </div>
              <div className="card-travel-body">
                <h5 className="card-travel-title">{travel.travelName}</h5>
                <hr />
                <p className="card-travel-destination">
                  {travel.origin} - {travel.destination}
                </p>
                <p className="card-travel-date">
                  <i className="far fa-calendar-plus"></i>
                  {travel.startDate} - {travel.endDate}
                </p>
              </div>
              <div className="profiles-info">
                <button className="btn-members">
                  {travel.travelMembers &&
                    travel.travelMembers.map((eachMember) => {
                      return (
                        <div className="card-text members" key={eachMember._id}>
                          <Link to={`/profile/${eachMember._id}`}>
                            {" "}
                            <img
                              src={eachMember.profilePic}
                              alt="profile pic"
                            />
                          </Link>
                        </div>
                      );
                    })}
                </button>
              </div>
              <div className="travel-details-extra">
                <div className="buttons-details">
                  {this.state.userToShow.ownTravels.includes(travel._id) ||
                  this.state.userToShow.joinTravels.includes(travel._id) ? (
                    <div className="icons-edit">
                      <div className="details-travel-icons">
                        <Link to={`/travel/${travel._id}/tasks`}>
                          <button className="tasks-btn">Tasks</button>
                        </Link>
                        <Link to={`/travel/edit/${travel._id}`}>
                          <button className="edit-travel-btn">
                            Edit travel
                          </button>
                        </Link>
                      </div>
                      <div className="inviteinput">
                        <InviteInput travel={travel} />
                      </div>
                    </div>
                  ) : null}
                  <div>
                    {this.state.userToShow.joinTravels.includes(travel._id) ||
                    this.state.userToShow.ownTravels.includes(
                      travel._id
                    ) ? null : (
                      <div className="join-travel">
                        <button
                          className="btn btn-secondary btn-join"
                          onClick={(e) => this.handleAccept(e, travel)}
                        >
                          <i className="fas fa-plus"></i>{" "}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default withAuth(TravelDetails);

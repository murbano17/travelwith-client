import React, { Component } from "react";
// import { withServices } from "../lib/Services/ServicesProvider";
import { Link } from "react-router-dom";
import { withAuth } from "../lib/Services/AuthProvider";
import InviteInput from "./InviteInput";

export class TravelDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      travelId: props.match.params.id,
      travelToShow: "",
    };
  }
  componentDidMount() {
    this.getTravelDetails();
  }

  openModal;

  getTravelDetails = () => {
    return this.props
      .getTravelsList()
      .then((resp) =>
        resp.filter((eachTravel) => eachTravel._id === this.state.travelId)
      )
      .then((res) => this.setState({ travelToShow: res[0] }))
      .catch((err) => console.log(err));
  };

  handleAccept = (e, travel) => {
    return this.props
      .joinTravel(travel)
      .then(() => this.getTravelDetails())
      .catch((err) => console.log("Error ", err));
  };

  render() {
    const travel = this.state.travelToShow;
    console.log("USER", travel.travelMembers);

    return (
      <div className="travel-details-container">
        <div className="card card-details" style={{ width: "18rem" }}>
          <div className="img-container">
            <img
              src={travel.coverPic}
              className="card-img-top"
              alt="cover travel pic"
            />
          </div>
          <div className="card-body travel-info-container">
            <h5 className="card-title">{travel.travelName}</h5>
            <p className="card-text destination">
              {travel.origin} - {travel.destination}
            </p>
            <p className="card-text">
              {travel.startDate} - {travel.endDate}
            </p>
            <button
              className="btn btn-primary"
              data-toggle="modal"
              data-target="#modal-travelMembers"
            >
              {travel.travelMembers &&
                travel.travelMembers.map((eachMember) => {
                  return (
                    <div className="card-text members" key={eachMember._id}>
                      <img src={eachMember.profilePic} alt="profile pic" />
                    </div>
                  );
                })}
            </button>

            {this.props.user.ownTravels.includes(travel._id) ||
            this.props.user.joinTravels.includes(travel._id) ? (
              <div>
                <div className="details-travel-icons">
                 <div>
                    <i className="fas fa-map-marked-alt icon card-body travel-info-container" />
                 </div>
                  <Link to={`/travel/${travel._id}/tasks`}>
                    <i className="fas fa-tasks icon card-body travel-info-container" />
                  </Link>
                  <Link to={`/travel/edit/${travel._id}`}>
                    <i className="fas fa-edit icon card-body travel-info-container" />
                  </Link>
                </div>

                <button onClick={(e) => this.handleAccept(e, travel)}>
                  Join Travel
                </button>
                <InviteInput travel={travel} />
              </div>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

export default withAuth(TravelDetails);

import React, { Component } from "react";
// import { withServices } from "../lib/Services/ServicesProvider";
import { Link } from "react-router-dom";
import { withAuth } from "../lib/Services/AuthProvider";
import NotificationPanel from "../components/NotificationPanel";
import "../styles/Card.css";
import "../styles/Dashboard.css";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      travelsOwned: [],
      travelsJoined: [],
      userId: props.match.params.id,
      userToShow: "",
    };
  }

  //1ero traer travels
  componentDidMount() {
    return this.props
      .getProfile(this.state.userId)
      .then((resp) =>
        this.setState({
          travelsOwned: resp.ownTravels,
          travelsJoined: resp.joinTravels,
          userToShow: resp,
        })
      )
      .catch((err) => console.log(err));
  }

  render() {
    return (
      <div className="dashboard-container">
        <div className="dashboard-header">
          <h1>Dashboard</h1>
        </div>

        <div className="notification-panel-container">
          <h2>Your invitations</h2>
          <NotificationPanel user={this.state.userToShow} />
        </div>

        <h2>Trips organized by you </h2>
        <div className="ownTravels-container">
          {this.state.travelsOwned.length > 0 ? (
            this.state.travelsOwned.map((eachTravel) => {
              return (
                <Link to={`/travel/${eachTravel._id}`} key={eachTravel._id}>
                  <div className="travel-card">
                    <div className="img-card">
                      <img
                        src={eachTravel.coverPic}
                        className="card-img-top"
                        alt="travelpic"
                      />
                    </div>
                    <div className="card-travel-body">
                      <h5 className="card-travel-title">
                        {eachTravel.travelName}
                      </h5>
                      <hr />
                      <p className="card-travel-destination">
                        {eachTravel.origin} - {eachTravel.destination}
                      </p>
                      <p className="card-travel-date">
                        <i className="far fa-calendar-plus"></i>{" "}
                        {eachTravel.startDate} - {eachTravel.endDate}
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })
          ) : (
            <p className="no-notifications">You don't organized any trip yet</p>
          )}
        </div>

        <h2>Trips that you are member</h2>
        <div className="joinedTravels-container">
          {this.state.travelsJoined.length > 0 ? (
            this.state.travelsJoined.map((eachTravel) => {
              return (
                <Link to={`/travel/${eachTravel._id}`} key={eachTravel._id}>
                  <div className="travel-card">
                    <div className="img-card">
                      <img
                        src={eachTravel.coverPic}
                        className="card-img-top"
                        alt="travelpic"
                      />
                    </div>
                    <div className="card-travel-body">
                      <h5 className="card-travel-title">
                        {eachTravel.travelName}
                      </h5>
                      <hr />
                      <p className="card-travel-destination">
                        {eachTravel.origin} - {eachTravel.destination}
                      </p>
                      <p className="card-travel-date">
                        <i className="far fa-calendar-plus"></i>{" "}
                        {eachTravel.startDate} - {eachTravel.endDate}
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })
          ) : (
            <p className="no-notifications">You haven't joined any trip yet</p>
          )}
        </div>
      </div>
    );
  }
}

export default withAuth(Dashboard);

import React, { Component } from "react";
// import { withServices } from "../lib/Services/ServicesProvider";
import { Link } from "react-router-dom";
import { withAuth } from "../lib/Services/AuthProvider";
import NotificationPanel from "../components/NotificationPanel";


class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      travelsOwned: [],
      travelsJoined: [],
      userId: props.match.params.id,
      userToShow: ''
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
          userToShow: resp
        })
      )
      .catch((err) => console.log(err));
  }

  // separar en dos array, a)  de los que soy owner, b) de los que soy miembro (s/ser owner) con filter
  //ponerlos en variables en state, y mostrar en dos componentes TravelCard distintos

  render() {
    return (
      <div className="dashboard-container">
      <h2>Pending invitations</h2>
      <NotificationPanel user={this.state.userToShow} />
      <h2>Organizer of: </h2>
        <div className="ownTravels-container">
          {this.state.travelsOwned &&
            this.state.travelsOwned.map((eachTravel) => {
              return (
                <Link
                  style={{ textDecoration: "none", color: "black" }}
                  to={`/travel/${eachTravel._id}`}
                  key={eachTravel._id}
                >
                  <div className="card" style={{ width: "18rem" }}>
                    <img
                      src={eachTravel.coverPic}
                      className="card-img-top"
                      alt="..."
                    />
                    <div className="card-body">
                      <h5 className="card-title">{eachTravel.travelName}</h5>
                      <p className="card-text">Origin: {eachTravel.origin}</p>
                      <p className="card-text">
                        Destination: {eachTravel.destination}
                      </p>
                      See travel details
                    </div>
                  </div>
                </Link>
              );
            })}
        </div>
        <h2>Member of</h2>
        <div className="joinedTravels-container">
          {this.state.travelsJoined &&
            this.state.travelsJoined.map((eachTravel) => {
              return (
                <Link
                  style={{ textDecoration: "none", color: "black" }}
                  to={`/travel/${eachTravel._id}`}
                  key={eachTravel._id}
                >
                  <div className="card" style={{ width: "18rem" }}>
                    <img
                      src={eachTravel.coverPic}
                      className="card-img-top"
                      alt="..."
                    />
                    <div className="card-body">
                      <h5 className="card-title">{eachTravel.travelName}</h5>
                      <p className="card-text">Origin: {eachTravel.origin}</p>
                      <p className="card-text">
                        Destination: {eachTravel.destination}
                      </p>
                      See travel details
                    </div>
                  </div>
                </Link>
              );
            })}
        </div>
      </div>
    );
  }
}

export default withAuth(Dashboard);

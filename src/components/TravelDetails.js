import React, { Component } from "react";
import { withServices } from "../lib/Services/ServicesProvider";
import { Link } from "react-router-dom";


export class TravelDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      travelId: props.match.params.id,
      travelToShow: "",
    };
  }
  componentDidMount() {
    return (
      this.props
        .getTravelsList()
        .then((resp) =>
          resp.filter((eachTravel) => eachTravel._id === this.state.travelId)
        )
        .then((res) => this.setState({ travelToShow: res[0] }))
        .catch((err) => console.log(err))
    );
  }

  render() {
    const travel = this.state.travelToShow;
    
    return (
      <div className="card" style={{ width: "18rem" }}>
        <div>
          <img src={travel.coverPic} className="card-img-top" alt="cover pic" />
        </div>
        <div className="card-body">
          <h5 className="card-title">{travel.travelName}</h5>
          <p className="card-text">Start date: {travel.startDate}</p>
          <p className="card-text">End date: {travel.endDate}</p>
          <p className="card-text">Origin: {travel.origin}</p>
          <p className="card-text">Destination: {travel.destination}</p>
          {/* <p className="card-text">Destination: {travel.travelM}</p> */}
          { travel.travelMembers && travel.travelMembers.map((eachMember) => {
            return (
              <div key={eachMember._id}>
                <p>Name: {eachMember.username}</p>
                <img src={eachMember.profilePic} alt="profile pic"/>
              </div>
            );
          })}
          <Link className="btn btn-primary" to={`/travel/${travel._id}/join`}>
            Join travel
          </Link>
        </div>
      </div>
    );
  }
}

export default withServices(TravelDetails);

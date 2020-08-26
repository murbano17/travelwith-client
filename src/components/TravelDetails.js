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
    return this.props
      .getTravelsList()
      .then((resp) =>
        resp.filter((eachTravel) => eachTravel._id === this.state.travelId)
      )
      .then((res) => this.setState({ travelToShow: res[0] }))
      .catch((err) => console.log(err));
  }

  render() {
    const travel = this.state.travelToShow;

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
          
       
            {travel.travelMembers &&
              travel.travelMembers.map((eachMember) => {
                return (
                  <div className="card-text members" key={eachMember._id}>
                    <img src={eachMember.profilePic} alt="profile pic" />
                  </div>
                  
                );
              })}
         
          
          <div className='details-travel-icons'>
            <Link><i className="fas fa-map-marked-alt icon card-body travel-info-container" /></Link>
            <Link to={`/travel/${travel._id}/tasks`}><i className="fas fa-tasks icon card-body travel-info-container"/></Link>
            <Link to={`/travel/edit/${travel._id}`}><i className="fas fa-edit icon card-body travel-info-container" /></Link>
          </div>
     {/*      <div
            className="tasks-container"
            style={{ border: "2px solid orange" }}
          >
            BARRA DE PROGRESO
          </div> */}
          <Link className="btn btn-primary" to={`/travel/${travel._id}/join`}>
            Join travel
          </Link>
          <InviteInput travel={travel} />
        </div>
        </div>
      </div>
    );
  }
}

export default withAuth(TravelDetails);

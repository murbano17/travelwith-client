import React from "react";
import { Link } from "react-router-dom";

const TravelCard = (props) => {
  //   const eachTravel = props.eachTravel
  return (
    <div className="card" style={{ width: "18rem" }}>
      <img src={props.coverPic} className="card-img-top" alt="..." />
      <div className="card-body">
        <h5 className="card-title">{props.travelName}</h5>
        <p className="card-text">Origin: {props.origin}</p>
        <p className="card-text">Destination: {props.destination}</p>
        <Link className="btn btn-primary" to={`/travel/${props._id}`}>See travel details</Link>
      </div>
    </div>
  );
};

export default TravelCard;

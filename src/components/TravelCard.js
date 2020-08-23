import React from "react";

const TravelCard = (props) => {
  //   const eachTravel = props.eachTravel
  return (
    <div className="card" style={{ width: "18rem" }}>
      <img src={props.coverPic} className="card-img-top" alt="..." />
      <div className="card-body">
        <h5 className="card-title">{props.travelName}</h5>
        <p className="card-text">Origin: {props.origin}</p>
        <p className="card-text">Destination: {props.destination}</p>
        <a href="#" className="btn btn-primary">
          See travel details
        </a>
      </div>
    </div>
  );
};

export default TravelCard;

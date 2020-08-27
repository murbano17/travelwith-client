import React from "react";
import { Link } from "react-router-dom";

const TravelCard = (props) => {
  //   const eachTravel = props.eachTravel
  return (
    <Link to={`/travel/${props._id}`} >
    <div className="card" style={{ width: "18rem" }}>
      <div className="img-card">
        <img src={props.coverPic} className="card-img-top" alt="travelpic" />
      </div>
      <div className="card-body">
        <h5 className="card-title">{props.travelName}</h5>
        <p className="card-text destination">{props.origin} - {props.destination}</p>
        <p className="card-text">{props.startDate} - {props.endDate}</p>
        {/* <Link className="btn btn-primary" to={`/travel/${props._id}`}>
          See travel details
        </Link> */}
      </div>
    </div>
    </Link>
  );
};

export default TravelCard;

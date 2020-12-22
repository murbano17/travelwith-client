import React from "react";
import { Link } from "react-router-dom";
import "../styles/Card.css";

const TravelCard = (props) => {
  //   const eachTravel = props.eachTravel
  return (
    <Link to={`/travel/${props._id}`}>
      <div className="travel-card" >
        <div className="img-card">
          <img src={props.coverPic} className="card-img-top" alt="travelpic" />
        </div>
        <div className="card-travel-body">
          <h5 className="card-travel-title">{props.travelName}</h5>
          <hr />
          <p className="card-travel-destination">
            {props.origin} - {props.destination}
          </p>
          <p className="card-travel-date">
            <i className="far fa-calendar-plus"></i> {props.startDate} -{" "}
            {props.endDate}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default TravelCard;

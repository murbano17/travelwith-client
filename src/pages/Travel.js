import React, { Component } from "react";
import { withServices } from "../lib/Services/ServicesProvider";
import TravelCard from "../components/TravelCard";

class Travel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      travelList: [],
    };
  }

  getList = () => {
    return this.props
      .getTravelsList()
      .then((res) => console.log("HOLA", res))
      .catch((err) => console.log(err));
  };

  componentDidMount() {
    this.getTravelsList();
  }

  render() {
    const { travel } = this.props;
    return (
      <div className="travelList-container">
        {this.state.travel.map((eachTravel) => {
          return <TravelCard key={eachTravel._id} {...eachTravel} />;
        })}
      </div>
    );
  }
}

export default withServices(Travel);

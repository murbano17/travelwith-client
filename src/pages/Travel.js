import React, { Component } from "react";
// import { withServices } from "../lib/Services/ServicesProvider";
import TravelCard from "../components/TravelCard";
import { withAuth } from "../lib/Services/AuthProvider";
import SearchBar from "../components/SearchBar";

class Travel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      travelList: [],
      travelToShow: [],
    };
  }

  componentDidMount() {
    return this.props
      .getTravelsList()
      .then((response) => response.filter((travel) => travel.isPublic))
      .then((resp) => this.setState({ travelList: resp, travelToShow: resp }))
      .catch((err) => console.log(err));
  }

  filterTravels = (searchString) => {
    const lowerSearchString = searchString.toLowerCase();
    const travelsCopy = [...this.state.travelList];
    const filteredTravels = travelsCopy.filter((travelObj) => {
      const travelDestination = travelObj.destination.toLowerCase();
      const travelName = travelObj.travelName.toLowerCase();

      if (travelDestination.includes(lowerSearchString)) {
        return true;
      } else if (travelName.includes(lowerSearchString)) {
        return true;
      } else {
        return false;
      }
    });
    this.setState({ travelToShow: filteredTravels });
  };

  render() {
    return (
      <div className="container-travel">
        <div className="header">
        <SearchBar  filterTravels={this.filterTravels} /></div>
        <div className="travelList-container">
          {this.state.travelToShow.map((eachTravel) => {
            return <TravelCard key={eachTravel._id} {...eachTravel} />;
          })}
        </div>
      </div>
    );
  }
}

export default withAuth(Travel);

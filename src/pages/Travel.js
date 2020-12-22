import React, { Component } from "react";
// import { withServices } from "../lib/Services/ServicesProvider";
import TravelCard from "../components/TravelCard";
import { withAuth } from "../lib/Services/AuthProvider";
import SearchBar from "../components/SearchBar";
import "../styles/Travel.css";

class Travel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      travelList: [],
      travelToShow: [],
    };
  }

  componentDidMount = async () => {
    const allTravels = await this.props.getTravelsList();
    const filteredTravels = allTravels.filter((travel) => travel.isPublic);
    this.setState({
      travelList: filteredTravels,
      travelToShow: filteredTravels,
    });
  };

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
          <h1>Are you looking for a travel?</h1>
          <h3>Find your best option and join with friends!</h3>
        </div>
        <div className="container-search-bar">
          <SearchBar filterTravels={this.filterTravels} />
        </div>
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

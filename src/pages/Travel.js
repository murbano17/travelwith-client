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

  // getList = () => {
  //   return (
  //   this.props.getTravelsList()
  //   .then(resp => this.setState({travelList: resp}))
  //   .catch(err => console.log(err)))
  // }

  componentDidMount() {
    return this.props
      .getTravelsList()
      .then((resp) => this.setState({ travelList: resp }))
      .catch((err) => console.log(err));
  }

  render() {
    return (
      <div className="travelList-container">
        {this.state.travelList.map((eachTravel) => {
          return <TravelCard key={eachTravel._id} {...eachTravel} />;
        })}
      </div>
    );
  }
}

export default withServices(Travel);

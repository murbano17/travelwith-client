import React, { Component } from "react";
// import { withServices } from "../lib/Services/ServicesProvider";
import { withAuth } from "../lib/Services/AuthProvider";

class Maps extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleChange = () => {};

  initMap = () => {
    const directionsService = new google.maps.DirectionsService();
    const directionsRenderer = new google.maps.DirectionsRenderer();
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 7,
      center: { lat: 41.85, lng: -87.65 },
    });
    directionsRenderer.setMap(map);

    const onChangeHandler = function () {
      calculateAndDisplayRoute(directionsService, directionsRenderer);
    };
    document
      .getElementById("start")
      .addEventListener("change", onChangeHandler);
    document.getElementById("end").addEventListener("change", onChangeHandler);
  };

  calculateAndDisplayRoute = (directionsService, directionsRenderer) => {
    directionsService.route(
      {
        origin: {
          query: document.getElementById("start").value,
        },
        destination: {
          query: document.getElementById("end").value,
        },
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (response, status) => {
        if (status === "OK") {
          directionsRenderer.setDirections(response);
        } else {
          window.alert("Directions request failed due to " + status);
        }
      }
    );
  };

  render() {
    return (
      <div className="map-container">
        <div id="floating-panel">
          <label>Start: </label>
          <input
            type="text"
            id="start"
            name="start"
            onChange={this.handleChange}
          />
          <label>End: </label>
          <input id="end" name="end" onChange={this.handleChange} />
        </div>
        <div id="map"></div>
      </div>
    );
  }
}

export default withAuth(Maps);

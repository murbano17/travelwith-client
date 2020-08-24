import React, { Component } from "react";
import { withServices } from '../lib/Services/ServicesProvider'

class CreateTravel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      travelName: "",
      startDate: "",
      endDate: "",
      origin: "",
      destination: "",
      isPublic: false,
      coverPic: "",
    };
  }
  
  handleFormSubmit = (event) => {
    event.preventDefault();
    const {
        travelName,
        startDate,
        endDate,
        origin,
        destination,
        isPublic,
        coverPic,
    } = this.state;

    this.props.createTravel({
        travelName,
        startDate,
        endDate,
        origin,
        destination,
        isPublic,
        coverPic,
    });
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
      console.log('PROPSSS', this.props)
    return (
      <div>
        <h1>Create your travel</h1>
        <form onSubmit={this.handleFormSubmit} encType="multipart/form-data">
          <label>Travel Name:</label>
          <input
            type="text"
            name="travelName"
            value={this.travelName}
            onChange={this.handleChange}
          />

          <label>startDate:</label>
          <input
            type="Date"
            name="startDate"
            value={this.startDate}
            onChange={this.handleChange}
          />

          <label>endDate:</label>
          <input
            type="Date"
            name="endDate"
            value={this.endDate}
            onChange={this.handleChange}
          />

          <label>Cover Picture:</label>
          <input
            type="file"
            name="coverPic"
            value={this.coverPic}
            onChange={this.handleChange}
          />

          <label>Origin:</label>
          <input
            type="text"
            name="origin"
            value={this.origin}
            onChange={this.handleChange}
          />

          <label>Destination:</label>
          <input
            type="text"
            name="destination"
            value={this.destination}
            onChange={this.handleChange}
          />

          <label>Make this travel Public?</label>
          <input
            type="checkbox"
            name="isPublic"
            value={this.isPublic}
            onChange={this.handleChange}
          />

          <input type="submit" value="Create travel" />
        </form>
      </div>
    );
  }
}

export default withServices(CreateTravel);

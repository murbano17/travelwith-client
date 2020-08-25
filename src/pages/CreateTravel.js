import React, { Component } from "react";
import { withAuth } from "../lib/Services/AuthProvider";
// import { withServices } from "../lib/Services/ServicesProvider";

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

    this.props.history.push("/travel");
  };

  handleChange = (event) => {
    let { name, value } = event.target;
    if (name === "isPublic" && value === "on") {
      value = !this.state.isPublic;
    }

    this.setState({ [name]: value });
  };

  handleFileUpload = (event) => {
    console.log("The file to be uploaded is:", event.target.files[0]);

    const uploadData = new FormData();
    uploadData.append("coverPic", event.target.files[0]);

    this.props
      .handleUploadCoverPic(uploadData)
      .then((response) => {
        console.log("response is:", response);
        this.setState({ coverPic: response.secure_url });
      })
      .catch((err) => {
        console.log("Error while uploading the file:", err);
      });
  };

  render() {
    return (
      <div className="create-travel-container">
        <h1>Create your travel</h1>
        <form onSubmit={this.handleFormSubmit} encType="multipart/form-data">
          <div className="form-group">
            <label>
              <b>Travel name:</b>
            </label>
            <input
              className="form-control"
              type="text"
              name="travelName"
              value={this.state.travelName}
              onChange={this.handleChange}
            />
          </div>

          <div className="form-group">
            <label>
              <b>Start date:</b>
            </label>
            <input
              className="form-control"
              type="Date"
              name="startDate"
              value={this.state.startDate}
              onChange={this.handleChange}
            />
          </div>

          <div className="form-group">
            <label>
              <b>End date:</b>
            </label>
            <input
              className="form-control"
              type="Date"
              name="endDate"
              value={this.state.endDate}
              onChange={this.handleChange}
            />
          </div>

          <div className="form-group">
            <label>
              <b>Cover Picture:</b>
            </label>
            <input
              className="form-control"
              type="file"
              name="coverPic"
              onChange={this.handleFileUpload}
            />
          </div>
          <div className="form-group">
            <label>
              <b>Origin:</b>
            </label>
            <input
              className="form-control"
              type="text"
              name="origin"
              value={this.state.origin}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <label>
              <b>Destination:</b>
            </label>
            <input
              className="form-control"
              type="text"
              name="destination"
              value={this.state.destination}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <label className="form-check-label">
              <b>Make this travel public? </b>
            </label>
            <input
              type="checkbox"
              name="isPublic"
              checked={this.state.isPublic}
              onChange={this.handleChange}
            />
          </div>
          <input type="submit" value="Create travel" className="btn btn-secondary" />
        </form>
      </div>
    );
  }
}

export default withAuth(CreateTravel);

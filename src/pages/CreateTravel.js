import React, { Component } from "react";
import { withAuth } from "../lib/Services/AuthProvider";
import "../styles/CreateTravel.css";

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
      messageError: "",
      successMessage: "",
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

    const validationForm = this.isFormValid();
    if (validationForm) {
      setTimeout(() => {
        this.props.createTravel({
          travelName,
          startDate,
          endDate,
          origin,
          destination,
          isPublic,
          coverPic,
        });
      }, 2500);
      this.props.history.push("/travel");
    }
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

  isFormValid = () => {
    if (this.state.travelName.trim().length === 0) {
      this.setState({ messageError: "Trip name is required" });
      return false;
    } else if (this.state.startDate.trim().length === 0) {
      this.setState({
        messageError: "Start trip date is required",
      });
      return false;
    } else if (this.state.endDate.trim().length === 0) {
      this.setState({
        messageError: "End trip date is required",
      });
      return false;
    }
    this.setState({ messageError: "" });
    this.setState({ successMessage: "Your new travel is created!" });
    return true;
  };

  render() {
    return (
      <div className="create-travel-container">
        <div className="header-create-travel">
          <div className="header-create-travel-titles">
            <h1>Create your own travel!</h1>
            <h3>and share it with friends</h3>
          </div>
        </div>

        <div className="form-create-container">
          <div className="container-form form-create-travel">
            {this.state.messageError.length > 0 ? (
              <div className="oaerror danger">
                <strong>Error</strong> - {this.state.messageError}.
              </div>
            ) : null}

            {this.state.successMessage.length > 0 ? (
              <div className="oaerror success">
                <strong>Success</strong> - {this.state.successMessage}
              </div>
            ) : null}
            <form
              onSubmit={this.handleFormSubmit}
              encType="multipart/form-data"
            >
              <div className="form-group">
                <label>
                  <b>Travel name*</b>
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
                  <b>Start date*</b>
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
                  <b>End date*</b>
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
                  <b>Cover Picture</b>
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
                  <b>Origin*</b>
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
                  <b>Destination*</b>
                </label>
                <input
                  className="form-control"
                  type="text"
                  name="destination"
                  value={this.state.destination}
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group checkbox">
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
              <input type="submit" value="Create travel" className="button" />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default withAuth(CreateTravel);

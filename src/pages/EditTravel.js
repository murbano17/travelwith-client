import React, { Component } from "react";
import { withAuth } from "../lib/Services/AuthProvider";
// import { withServices } from "../lib/Services/ServicesProvider";

class EditTravel extends Component {
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
      travelId: props.match.params.id,
    };
  }

  componentDidMount() {
    return this.props
      .getTravelsList()
      .then((resp) =>
        resp.filter((eachTravel) => eachTravel._id === this.state.travelId)
      )
      .then((res) =>
        this.setState({
          travelName: res.travelName,
          startDate: res.startDate,
          endDate: res.endDate,
          origin: res.origin,
          destination: res.destination,
          isPublic: res.isPublic,
          coverPic: res.coverPic,
        })
      )
      .catch((err) => console.log(err));
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

    this.props.editTravel({
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
      <div className="edit-travel-container">
        <h1>Edit your Travel</h1>
        <form onSubmit={this.handleFormSubmit} encType="multipart/form-data">
          <div className="form-group">
            <label>
              <b>Travel Name:</b>
            </label>
            <input
              className="form-control"
              type="text"
              name="travelName"
              value={this.travelName}
              onChange={this.handleChange}
              placeholder={this.state.travelName}
            />
          </div>
          <div className="form-group">
            <label>
              <b>Start Date:</b>
            </label>
            <input
              className="form-control"
              type="Date"
              name="startDate"
              value={this.startDate}
              onChange={this.handleChange}
              placeholder={this.state.startDate}
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
              value={this.endDate}
              onChange={this.handleChange}
              placeholder={this.state.endDate}
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
              value={this.origin}
              onChange={this.handleChange}
              placeholder={this.state.origin}
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
              value={this.destination}
              onChange={this.handleChange}
              placeholder={this.state.destination}
            />
          </div>

          <div className="form-group">
            <label>
              <b>Make this travel Public?</b>
            </label>
            <input
              className="form-control"
              type="checkbox"
              name="isPublic"
              checked={this.isPublic}
              onChange={this.handleChange}
            />
          </div>
          <input type="submit" value="Create travel" />
        </form>
      </div>
    );
  }
}

export default withAuth(EditTravel);

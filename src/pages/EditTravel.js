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
      _id: ''
    };
  }

  componentDidMount() {
    this.getTravel()
  }

  getTravel = () => {
    return this.props
      .getTravelsList()
      .then((resp) =>
        resp.filter((eachTravel) => eachTravel._id === this.state.travelId)
      )
      .then((res) =>
        this.setState({
          travelName: res[0].travelName,
          startDate: res[0].startDate,
          endDate: res[0].endDate,
          origin: res[0].origin,
          destination: res[0].destination,
          isPublic: res[0].isPublic,
          coverPic: res[0].coverPic,
          _id: res[0]._id
        })
      )
      .catch((err) => console.log(err));
  };

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
      _id,
    } = this.state;

    this.props.editTravel({
      travelName,
      startDate,
      endDate,
      origin,
      destination,
      isPublic,
      coverPic,
      _id,
    });
    this.getTravel()
    this.props.history.push("/");
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
              value={this.state.travelName}
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
              value={this.state.startDate}
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
              value={this.state.endDate}
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
              value={this.state.origin}
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
              value={this.state.destination}
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
              checked={this.state.isPublic}
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

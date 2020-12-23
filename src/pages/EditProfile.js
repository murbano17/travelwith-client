import React, { Component } from "react";
import { withAuth } from "../lib/Services/AuthProvider";
import { Link } from "react-router-dom";
import "../styles/EditTravel.css";
class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: props.match.params.id,
      user: "",
    };
  }

  componentDidMount() {
    this.getProfile();
  }

  getProfile = () => {
    return this.props
      .getProfile(this.state.userId)
      .then((user) =>
        this.setState({
          _id: user._id,
          userBirthdate: user.userBirthdate,
          username: user.username,
          userFrom: user.userFrom,
          about: user.about,
          profilePic: user.profilePic,
        })
      )
      .catch((err) => console.log(err));
  };

  handleFormSubmit = (event) => {
    event.preventDefault();
    const {
      username,
      userFrom,
      about,
      profilePic,
      _id,
      userBirthdate,
    } = this.state;

    this.props.editProfile({
      username,
      userFrom,
      about,
      profilePic,
      _id,
      userBirthdate,
    });

    this.getProfile();
    this.props.history.push(`/profile/${this.state.userId}`);
  };

  handleChange = (event) => {
    let { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleFileUpload = (event) => {
    console.log("The file to be uploaded is: ", event.target.files[0]);

    const uploadData = new FormData();
    uploadData.append("profilePic", event.target.files[0]);

    this.props
      .handleUpload(uploadData)
      .then((response) => {
        this.setState({ profilePic: response.secure_url });
      })
      .catch((err) => {
        console.log("Error while uploading the file: ", err);
      });
  };
  handlePictureClick = () => {
    document.querySelector("#fileSelectorEditProfile").click();
  };
  render() {
    return (
      <div className="edit-travel-container">
        <div className="header-edit-travel">
          <div className="header-edit-travel-titles">
            <h1>Edit your profile</h1>
          </div>
        </div>
        <div className="arrow-back">
          <Link to={`/travel/${this.state.travelId}`}>
            <i className="fas fa-chevron-left"></i>
            <span>go back</span>
          </Link>
        </div>
        <div className="edit-profile-form-container">
          <form onSubmit={this.handleFormSubmit} encType="multipart/form-data">
            <div className="form-group">
              <label>
                <b>Username:</b>
              </label>
              <input
                className="form-control"
                name="username"
                type="text"
                value={this.username}
                onChange={this.handleChange}
                placeholder={this.state.username}
              />
            </div>

            <div className="form-group">
              <label>
                <b>From:</b>
              </label>
              <input
                className="form-control"
                name="userFrom"
                type="text"
                value={this.userFrom}
                onChange={this.handleChange}
                placeholder={this.state.userFrom}
              />
            </div>

            <div className="form-group">
              <label>
                <b>About:</b>
              </label>
              <textarea
                rows="5"
                className="form-control"
                name="about"
                type="text"
                value={this.about}
                onChange={this.handleChange}
                placeholder={this.state.about}
              />
            </div>

            <div className="form-group">
              <label>
                <b>Profile picture:</b>
              </label>
              <input
                style={{ display: "none" }}
                id="fileSelectorEditProfile"
                className="form-control"
                type="file"
                name="profilePic"
                onChange={this.handleFileUpload}
              />
              <input
                className="form-control image-input"
                onClick={this.handlePictureClick}
                placeholder="Upload file"
              />
            </div>

            <input type="submit" value="Edit Profile" className="button" />
          </form>
        </div>
      </div>
    );
  }
}

export default withAuth(EditProfile);

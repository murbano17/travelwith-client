import React, { Component } from "react";
import { withServices } from "../lib/Services/ServicesProvider";

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: props.match.params.id,
      user: "",
    };
  }

  componentDidMount() {
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
  }

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

    this.props.history.push(`/profile/${this.state.userId}`)
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
        console.log("response is: ", response);
        this.setState({ profilePic: response.secure_url });
      })
      .catch((err) => {
        console.log("Error while uploading the file: ", err);
      });
  };

  render() {
    return (
      <div>
        <h1>Edit Profile</h1>
        <form onSubmit={this.handleFormSubmit} encType="multipart/form-data">
          <label>Username</label>
          <input
            name="username"
            type="text"
            value={this.username}
            onChange={this.handleChange}
            placeholder={this.state.username}
          />
          <label>From</label>
          <input
            name="userFrom"
            type="text"
            value={this.userFrom}
            onChange={this.handleChange}
            placeholder={this.state.userFrom}
          />
          <label>About</label>
          <input
            name="about"
            type="text"
            value={this.about}
            onChange={this.handleChange}
            placeholder={this.state.about}
          />

          <label>Cover Picture:</label>
          <input
            type="file"
            name="profilePic"
            onChange={this.handleFileUpload}
          />

          <input type="submit" value="Edit Profile" />
        </form>
      </div>
    );
  }
}

export default withServices(EditProfile);

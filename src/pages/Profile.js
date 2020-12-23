import React, { Component } from "react";
// import { withServices } from "../lib/Services/ServicesProvider";
import { Link } from "react-router-dom";
import { withAuth } from "../lib/Services/AuthProvider";
import "../styles/Profile.css";
import isEqual from "lodash/isEqual";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: props.match.params.id,
      userToShow: "",
      currentUser: "",
    };
  }
  mounted = false;

  getProfile = () => {
    return this.props
      .getProfile(this.state.userId)
      .then((resp) => this.setState({ userToShow: resp }))
      .catch((err) => console.log(err));
  };

  componentDidMount = () => {
    this.mounted = true;
    this.getProfile();
  };

  componentDidUpdate = async () => {
    const userProfile = await this.props.getProfile(this.state.userId);
    if (this.mounted && !isEqual(this.state.userToShow, userProfile)) {
      this.setState({ userToShow: userProfile });
    }
  };
  componentWillUnmount() {
    this.mounted = false;
  }

  render() {
    return (
      <div className="profile-container">
        <div className="profile-header">
          <h1>Profile</h1>
        </div>

        <div className="profile-card">
          <div className="profile-image">
            <img src={this.state.userToShow.profilePic} alt="user-pic" />
          </div>
          <div>
            <h5>{this.state.userToShow.username}</h5>
            <div className="profile-info">
              <p>
                <b>From:</b> {this.state.userToShow.userFrom}
              </p>
              <p>
                <b>About me:</b> {this.state.userToShow.about}
              </p>
            </div>
            {this.props.user._id === this.state.userToShow._id ? (
              <div className="links-profile">
                <Link to={`/profile/${this.state.userToShow._id}/dashboard`}>
                  <button className="profile-btn">My dashboard</button>
                </Link>
                <Link to={`/profile/edit/${this.state.userToShow._id}`}>
                  <button className="edit-profile-btn">Edit profile</button>
                </Link>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

export default withAuth(Profile);

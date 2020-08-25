import React, { Component } from "react";
// import { withServices } from "../lib/Services/ServicesProvider";
import { Link } from "react-router-dom";
import { withAuth } from "../lib/Services/AuthProvider";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: props.match.params.id,
      userToShow: [],
      currentUser: "",
    };
  }

  componentDidMount() {
    return this.props
      .getProfile(this.state.userId)
      .then((resp) => this.setState({ userToShow: resp }))
      .catch((err) => console.log(err));
  }

  render() {
    let user = this.state.userToShow;
    return (
      <div className="profile-container">
        <div className="profile-card">
          <div className="profile-image">
            <img src={user.profilePic} alt="user-pic" />
          </div>
          <div>
            <h5>{user.username}</h5>
            <div className="profile-info">
              <p>
                <b>From:</b> {user.userFrom}
              </p>
              <p>
                <b>About me:</b> {user.about}
              </p>
            </div>
            {this.props.user._id == user._id ? (
              <div className="links-profile">
                <Link to={`/profile/${user._id}/dashboard`}>
                  <p>My dashboard</p>
                </Link>
                <Link to={`/profile/edit/${user._id}`}>
                  <p>
                    {" "}
                    <i className="fas fa-edit icon" />
                  </p>
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

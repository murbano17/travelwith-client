import React, { Component } from "react";
import { withServices } from "../lib/Services/ServicesProvider";
import { Link } from "react-router-dom";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: props.match.params.id,
      userToShow: [],
    };
  }

  componentDidMount() {
    return this.props
      .getProfile(this.state.userId)
      .then((resp) => this.setState({ userToShow: resp }))
      .catch((err) => console.log(err));
  }

  render() {
    let user = this.state.userToShow
    return (
      <div className="card" style={{ width: "18rem" }}>
        <img src={user.profilePic} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{user.username}</h5>
          <p className="card-text">From: {user.userFrom}</p>
          <p className="card-text">About: {user.about}</p>
          <Link className="btn btn-primary" to={`/profile/edit/${user._id}`}>
            Edit user
          </Link>
          <Link className="btn btn-primary" to={`/profile/${user._id}/dashboard`}>
            Dashboard
          </Link>
        </div>
      </div>
    );
  }
}

export default withServices(Profile);

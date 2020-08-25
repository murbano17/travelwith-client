import React from "react";
import services from "./Services";
import axios from "axios";
const { Consumer, Provider } = React.createContext();

//Consumer
const withServices = (WrappedComponent) => {
  return class extends React.Component {
    render() {
      return (
        <Consumer>
          {({
            getTravelsList,
            createTravel,
            deleteTravel,
            getProfile,
            editProfile,
            createTask,
            editTask,
            deleteTask,
            createInvitation,
            joinTravel,
            travel,
            user,
            handleUpload,
            handleUploadCoverPic,
            editTravel,
          }) => {
            return (
              <WrappedComponent
                getTravelsList={getTravelsList}
                createTravel={createTravel}
                deleteTravel={deleteTravel}
                getProfile={getProfile}
                editProfile={editProfile}
                createTask={createTask}
                editTask={editTask}
                deleteTask={deleteTask}
                createInvitation={createInvitation}
                joinTravel={joinTravel}
                travel={travel}
                editTravel={editTravel}
                user={user}
                handleUpload={handleUpload}
                handleUploadCoverPic={handleUploadCoverPic}
                {...this.props}
              />
            );
          }}
        </Consumer>
      );
    }
  };
};

//Provider
class ServiceProvider extends React.Component {
  constructor() {
    super();
    this.state = { isLoading: true, travel: null, user: null };
  }

  componentDidMount() {
    this.setState({ isLoading: false });
  }

  getTravelsList = () => {
    return services
      .getTravelsList()
      .then((res) => res)
      .catch((err) => console.log(err));
  };

  createTravel = (travel) => {
    const {
      travelName,
      startDate,
      endDate,
      origin,
      destination,
      isPublic,
      coverPic,
    } = travel;

    return services
      .createTravel({
        travelName,
        startDate,
        endDate,
        origin,
        destination,
        isPublic,
        coverPic,
      })
      .then((travel) => this.setState({ travel }))
      .catch((err) => console.log(err));
  };

  editTravel = (travel) => {
    const {
      _id,
      travelName,
      startDate,
      endDate,
      origin,
      destination,
      coverPic,
    } = travel;

    return services
      .editTravel({
        _id,
        travelName,
        startDate,
        endDate,
        origin,
        destination,
        coverPic,
      })
      .then((travel) => this.setState({ travel }))
      .catch((err) => console.log(err));
  };

  deleteTravel = (travel) => {
    const { _id } = travel;

    return services
      .deleteTravel(_id)
      .then((response) => console.log("Travel deleted", response))
      .catch((err) => console.log(err));
  };

  getProfile = (id) => {
    const userId = id
    return services
      .getProfile(userId)
      .then((user) => user)
      .catch((err) => console.log(err));
  };

  editProfile = (user) => {
    const { _id, username, userFrom, userBirthdate, about, profilePic } = user;

    return services
      .editProfile({
        _id,
        username,
        userFrom,
        userBirthdate,
        about,
        profilePic,
      })
      .then((user) => this.setState({ user }))
      .catch((err) => console.log(err));
  };

  createTask = (travel, taskName) => {
    const { _id } = travel;

    return services
      .createTask({ _id, taskName })
      .then((res) => console.log("Task created"))
      .catch((err) => console.log(err));
  };

  editTask = (task) => {
    const { _id, taskName, taskDeadline, assignTo, taskNote, doneTask} = task;
    return services
      .editTask({ _id, taskName, taskDeadline, assignTo, taskNote, doneTask })
      .then((task) => console.log(task + "edited"))
      .catch((err) => console.log(err));
  };

  deleteTask = (task) => {
    const { _id } = task;

    return services
      .deleteTask({ _id })
      .then((resp) => console.log(resp))
      .catch((err) => console.log(err));
  };

  createInvitation = (travel, guestEmail) => {
    const { _id } = travel;

    return services
      .createInvitation({ _id, guestEmail })
      .then((res) => console.log("Invitation created"))
      .catch((err) => console.log(err));
  };

  handleUpload(theFile) {
    return axios
      .create({
        baseURL: process.env.REACT_APP_API_URI,
        withCredentials: true,
      })
      .post("/upload", theFile)
      .then((res) => res.data)
      .catch((err) => console.log(err));
  }

  //handle duplicado por doble ruta (VER!)
  handleUploadCoverPic(theFile) {
    return axios
      .create({
        baseURL: process.env.REACT_APP_API_URI,
        withCredentials: true,
      })
      .post("/upload/coverpic", theFile)
      .then((res) => res.data)
      .catch((err) => console.log(err));
  }

  joinTravel = (travel) => {
    const { _id } = travel;

    return services
      .joinTravel({ _id })
      .then((response) => console.log(response))
      .catch((err) => console.log(err));
  };

  render() {
    const {
      getTravelsList,
      createTravel,
      deleteTravel,
      getProfile,
      editProfile,
      createTask,
      editTask,
      deleteTask,
      createInvitation,
      joinTravel,
      handleUpload,
      handleUploadCoverPic,
      editTravel,
    } = this;
    const { isLoading, user, travel } = this.state;

    return isLoading ? (
      <div>Loading...</div>
    ) : (
      <Provider
        value={{
          getTravelsList,
          createTravel,
          deleteTravel,
          getProfile,
          editProfile,
          createTask,
          editTask,
          deleteTask,
          createInvitation,
          joinTravel,
          travel,
          user,
          handleUpload,
          handleUploadCoverPic,
          editTravel,
        }}
      >
        {this.props.children}
      </Provider>
    );
  }
}

export { Consumer, withServices, ServiceProvider };

import axios from "axios";
import React from "react";
import auth from "./AuthService";
const { Consumer, Provider } = React.createContext();

const withAuth = (WrappedComponent) => {
  return class extends React.Component {
    render() {
      return (
        <Consumer>
          {({
            login,
            signup,
            user,
            logout,
            isLoggedin,
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
            handleUpload,
            handleUploadCoverPic,
            editTravel,
            deleteInvite,
            getInviteList,
          }) => {
            return (
              <WrappedComponent
                login={login}
                signup={signup}
                user={user}
                logout={logout}
                isLoggedin={isLoggedin}
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
                handleUpload={handleUpload}
                handleUploadCoverPic={handleUploadCoverPic}
                deleteInvite={deleteInvite}
                getInviteList={getInviteList}
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
class AuthProvider extends React.Component {
  state = { isLoggedin: false, user: null, isLoading: true };

  componentDidMount() {
    auth
      .me()
      .then((user) =>
        this.setState({ isLoggedin: true, user: user, isLoading: false })
      )
      .catch((err) =>
        this.setState({ isLoggedin: false, user: null, isLoading: false })
      );
    this.setState({ isLoading: false });
  }

  signup = (user) => {
    const {
      username,
      email,
      password,
      profilePic,
      userFrom,
      userBirthdate,
      about,
      invitationCode,
    } = user;

    auth
      .signup({
        username,
        email,
        password,
        profilePic,
        userFrom,
        userBirthdate,
        about,
        invitationCode,
      })
      .then((user) => this.setState({ isLoggedin: true, user }))
      .catch(({ response }) => {
        this.setState({ message: response.data.statusMessage });
      });
  };

  login = (user) => {
    const { email, password } = user;

    auth
      .login({ email, password })
      .then((user) => this.setState({ isLoggedin: true, user }))
      .catch((err) => console.log(err));
  };

  logout = () => {
    auth
      .logout()
      .then(() => this.setState({ isLoggedin: false, user: null }))
      .catch((err) => console.log(err));
  };

  getTravelsList = () => {
    return auth
      .getTravelsList()
      .then((res) => res)
      .catch((err) => console.log(err));
  };

  getInviteList = () => {
    return auth
      .getInviteList()
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

    return auth
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
      isPublic,
    } = travel;

    auth
      .editTravel({
        _id,
        travelName,
        startDate,
        endDate,
        origin,
        destination,
        coverPic,
        isPublic,
      })
      .then((travel) => this.setState({ travel }))
      .catch((err) => console.log(err));
  };

  deleteTravel = (travel) => {
    const { _id } = travel;

    return auth
      .deleteTravel(_id)
      .then((response) => console.log("Travel deleted", response))
      .catch((err) => console.log(err));
  };

  getProfile = (id) => {
    const userId = id;
    return auth
      .getProfile(userId)
      .then((user) => user)
      .catch((err) => console.log(err));
  };

  editProfile = (user) => {
    const { _id, username, userFrom, userBirthdate, about, profilePic } = user;

    return auth
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

    return auth
      .createTask({ _id, taskName })
      .then((res) => console.log("Task created"))
      .catch((err) => console.log(err));
  };

  editTask = (task) => {
    const { _id, taskName, taskDeadline, assignTo, taskNote, doneTask } = task;
    return auth
      .editTask({ _id, taskName, taskDeadline, assignTo, taskNote, doneTask })
      .then((task) => console.log(task + "edited"))
      .catch((err) => console.log(err));
  };

  deleteTask = (task) => {
    const { _id } = task;

    return auth
      .deleteTask({ _id })
      .then((resp) => console.log(resp))
      .catch((err) => console.log(err));
  };

  createInvitation = (travel, guestEmail) => {
    const { _id } = travel;

    return auth
      .createInvitation({ _id, guestEmail })
      .then((res) => console.log("Invitation created"))
      .catch((err) => console.log(err));
  };

  deleteInvite = (invite) => {
    const { _id } = invite;

    return auth
      .deleteInvite({ _id })
      .then((resp) => console.log("Invite deleted", resp))
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

    return auth
      .joinTravel({ _id })
      .then((response) => console.log(response))
      .catch((err) => console.log(err));
  };

  render() {
    const { isLoading, isLoggedin, user } = this.state;
    const {
      login,
      logout,
      signup,
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
      handleUpload,
      handleUploadCoverPic,
      editTravel,
      deleteInvite,
      getInviteList,
    } = this;

    return isLoading ? (
      <div>Loading...</div>
    ) : (
      <Provider
        value={{
          isLoggedin,
          user,
          login,
          logout,
          signup,
          isLoading,
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
          handleUpload,
          handleUploadCoverPic,
          editTravel,
          deleteInvite,
          getInviteList,
        }}
      >
        {this.props.children}
      </Provider>
    );
  }
}

export { Consumer, withAuth };
export default AuthProvider;

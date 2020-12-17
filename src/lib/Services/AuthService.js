import axios from "axios";

class Auth {
  constructor() {
    this.auth = axios.create({
      baseURL: process.env.REACT_APP_API_URI,
      withCredentials: true,
    });
  }
  signup({
    username,
    email,
    password,
    profilePic,
    userFrom,
    userBirthdate,
    about,
  }) {
    return this.auth
      .post("/api/signup", {
        username,
        email,
        password,
        profilePic,
        userFrom,
        userBirthdate,
        about,
      })
      .then(({ data }) => data);
  }

  login({ email, password }) {
    return this.auth
      .post("/api/login", {
        email,
        password,
      })
      .then(({ data }) => data);
  }

  logout() {
    return this.auth.post("/api/logout", {}).then(({ data }) => data);
  }

  me() {
    return this.auth.get("/api/me").then(({ data }) => data);
  }

  getTravelsList() {
    return this.auth.get("/api/travel", {}).then(({ data }) => data);
  }
  getTravel(id) {
    return this.auth.get(`/api/travel/${id}`, {}).then(({ data }) => data);
  }
  createTravel({
    travelName,
    startDate,
    endDate,
    origin,
    destination,
    isPublic,
    coverPic,
  }) {
    return this.auth
      .post("/api/travel/create", {
        travelName,
        startDate,
        endDate,
        origin,
        destination,
        isPublic,
        coverPic,
      })
      .then(({ data }) => data);
  }

  editTravel({
    travelName,
    startDate,
    endDate,
    origin,
    destination,
    isPublic,
    coverPic,
    _id,
  }) {
    return this.auth
      .patch(`/api/travel/edit/${_id}`, {
        travelName,
        startDate,
        endDate,
        origin,
        destination,
        isPublic,
        coverPic,
      })
      .then(({ data }) => data);
  }

  deleteTravel(_id) {
    return this.auth.post(`/api/travel/delete/${_id}`, {}).then(({ data }) => data);
  }

  getProfile(_id) {
    return this.auth.get(`/api/profile/${_id}`, {}).then(({ data }) => data);
  }

  editProfile({ _id, username, userFrom, userBirthdate, about, profilePic }) {
    return this.auth
      .patch(`/api/profile/edit/${_id}`, {
        username,
        userFrom,
        userBirthdate,
        about,
        profilePic,
      })
      .then(({ data }) => data);
  }

  createTask({ _id, taskName }) {
    return this.auth
      .post(`/api/travel/${_id}/createtask`, { taskName })
      .then(({ data }) => data);
  }

  editTask({ _id, taskName, taskDeadline, assignTo, taskNote, doneTask }) {
    return this.auth
      .post(`/api/task/edit/${_id}`, {
        taskName,
        taskDeadline,
        assignTo,
        taskNote,
        doneTask,
      })
      .then(({ data }) => data);
  }

  deleteTask({ _id }) {
    return this.auth.post(`/api/task/delete/${_id}`, {}).then(({ data }) => data);
  }

  createInvitation({ _id, guestEmail }) {
    return this.auth
      .post(`/api/travel/${_id}/createinvite`, { guestEmail })
      .then(({ data }) => data);
  }

  getInviteList() {
    return this.auth.get("/api/invite", {}).then(({ data }) => data);
  }

  deleteInvite({ _id }) {
    return this.auth.post(`/api/invite/${_id}/delete`, {}).then(({ data }) => data);
  }

  joinTravel({ _id }) {
    return this.auth.post(`/api/travel/${_id}/join`, {}).then(({ data }) => data);
  }
}
const axiosRequestFunctions = new Auth();
export default axiosRequestFunctions;

import axios from "axios";

class AxiosMethods {
  constructor() {
    this.axiosBaseRoute = axios.create({
      baseURL: process.env.REACT_APP_API_URI,
      withCredentials: true,
    });
  }

  getTravelsList() {
    return this.axiosBaseRoute.get("/travel", {}).then(({ data }) => data)
  }

  // getOneTravel(travel) {
  //   return this.axiosBaseRoute
  //     .get(`/travel/${travel._id}`, {})
  //     .then(({ data }) => data);
  // }

  createTravel({
    travelName,
    startDate,
    endDate,
    origin,
    destination,
    isPublic,
    coverPic,
  }) {
    return this.axiosBaseRoute
      .post("/travel/create", {
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
    _id,
    travelName,
    startDate,
    endDate,
    origin,
    destination,
    coverPic,
  }) {
    return this.axiosBaseRoute
      .post(`/travel/edit/${_id}`, {
        travelName,
        startDate,
        endDate,
        origin,
        destination,
        coverPic,
      })
      .then(({ data }) => data);
  }

  deleteTravel(_id) {
    return this.axiosBaseRoute
      .post(`/travel/delete/${_id}`, {})
      .then(({ data }) => data);
  }

  getProfile(_id) {
    return this.axiosBaseRoute
      .get(`/profile/${_id}`, {})
      .then(({ data }) => data);
  }

  editProfile({ _id, userName, userFrom, userBirthdate, about, profilePic }) {
    return this.axiosBaseRoute
      .post(`/profile/edit/${_id}`, {
        _id,
        userName,
        userFrom,
        userBirthdate,
        about,
        profilePic,
      })
      .then(({ data }) => data);
  }

  createTask({ _id, taskName }) {
    return this.axiosBaseRoute
      .post(`/travel/${_id}/createtask`, { taskName })
      .then(({ data }) => data);
  }

  editTask({ _id, taskName, taskDeadline, assignTo, taskNote }) {
    return this.axiosBaseRoute
      .post(`/task/edit/${_id}`, { taskName, taskDeadline, assignTo, taskNote })
      .then(({ data }) => data);
  }

  deleteTask({ _id }) {
    return this.axiosBaseRoute
      .post(`/task/delete/${_id}`, {})
      .then(({ data }) => data);
  }

  createInvitation({ _id, guestEmail }) {
    return this.axiosBaseRoute
      .post(`/travel/${_id}/createinvite`, { guestEmail })
      .then(({ data }) => data);
  }

  joinTravel({ _id }) {
    return this.axiosBaseRoute
      .post(`/travel/${_id}/join`, {})
      .then(({ data }) => data);
  }
  
}

const axiosRequestMethods = new AxiosMethods();
export default axiosRequestMethods;

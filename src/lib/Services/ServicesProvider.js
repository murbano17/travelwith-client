import React from "react";
import services from "./Services";
import auth from "./AuthService";
const { Consumer, Provider } = React.createContext();

//Consumer
// const withServices = (WrappedComponent) => {}

//Provider

class ServiceProvider extends React.Component {
  constructor() {
    super();
    this.state = { isLoading: true, travel: null, };
  }

  componentDidMount() {
    this.setState({ isLoading: false });
  }

  getTravelsList = () => {
    services.getTravelsList();
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

    services.createTravel({
      travelName,
      startDate,
      endDate,
      origin,
      destination,
      isPublic,
      coverPic,
    })
    .then((travel) => this.setState({travel}))
    .catch(err => console.log(err))
  };

  

  render() {
    return isLoading ? (
      <div>Loading...</div>
    ) : (
      <Provider value={{}}>{this.props.children}</Provider>
    );
  }
}

export { Consumer, withServices };
export default ServiceProvider;

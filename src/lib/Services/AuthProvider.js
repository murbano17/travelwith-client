import React from "react";
import auth from "./AuthService";
const { Consumer, Provider } = React.createContext();

const withAuth = (WrappedComponent) => {
  return class extends React.Component {
    render() {
      return (
        <Consumer>
          {({ login, signup, user, logout, isLoggedin }) => {
            return (
              <WrappedComponent
                login={login}
                signup={signup}
                user={user}
                logout={logout}
                isLoggedin={isLoggedin}
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
    auth.me()
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

  render() {
    const { isLoading, isLoggedin, user } = this.state;
    const { login, logout, signup } = this;

    return isLoading ? (
      <div>Loading...</div>
    ) : (
      <Provider value={{ isLoggedin, user, login, logout, signup }}>
        {this.props.children}
      </Provider>
    );
  }
}

export { Consumer, withAuth };
export default AuthProvider;

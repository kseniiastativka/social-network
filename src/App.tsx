import "./App.css";
import React, { ComponentType } from "react";
import { Route, withRouter } from "react-router-dom";
import News from "./components/News/News";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";
import NavbarContainer from "./components/Navbar/NavbarContainer";
import UsersContainer from "./components/Users/UsersContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import { Login } from "./components/Login/Login";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import { compose } from "redux";
import { initialiseApp } from "./redux/app-reducer";
import { State } from "./redux/redux-store";
import Spinner from "./components/common/Spinner/Spinner";

const DialogsContainer = React.lazy(
  () => import("./components/Dialogs/DialogsContainer")
);
const ProfileComponent = React.lazy(
  () => import("./components/Profile/ProfileContainer")
);

interface AppComponentProps extends RouteComponentProps {
  initialiseApp: () => void;
  initialized: boolean;
}

class App extends React.Component<AppComponentProps> {
  componentDidMount() {
    this.props.initialiseApp();
  }

  render() {
    if (!this.props.initialized) {
      return <Spinner />;
    }
    return (
      <div className="app-wrapper">
        <HeaderContainer />
        <NavbarContainer />
        <div className="app-wrapper-content">
          <Route
            path="/dialogs"
            render={() => {
              return (
                <React.Suspense fallback={<Spinner />}>
                  <DialogsContainer />
                </React.Suspense>
              );
            }}
          />
          <Route
            path="/profile/:userId?"
            render={() => {
              return (
                <React.Suspense fallback={<Spinner />}>
                  <ProfileComponent />
                </React.Suspense>
              );
            }}
          />
          <Route path="/news" render={() => <News />} />
          <Route path="/music" render={() => <Music />} />
          <Route path="/settings" render={() => <Settings />} />
          <Route path="/users" render={() => <UsersContainer />} />
          <Route path="/login" render={() => <Login />} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: State) => ({
  initialized: state.app.initialized,
});

export default compose<
  ComponentType<{ initialiseApp: () => void; initialized: boolean }>,
  ComponentType<AppComponentProps>,
  ComponentType<{}>
>(
  connect(mapStateToProps, { initialiseApp }),
  withRouter
)(App);

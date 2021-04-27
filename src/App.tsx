import "./App.css";
import React, { ComponentType } from "react";
import { Route, withRouter } from "react-router-dom";
import News from "./components/News/News";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import NavbarContainer from "./components/Navbar/NavbarContainer";
import UsersContainer from "./components/Users/UsersContainer";
import ProfileComponent from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import { Login } from "./components/Login/Login";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import { compose } from "redux";
import { initialiseApp } from "./redux/app-reducer";
import { State } from "./redux/redux-store";
import Spinner from "./components/common/Spinner/Spinner";

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
          <Route path="/dialogs" render={() => <DialogsContainer />} />
          <Route path="/profile/:userId?" render={() => <ProfileComponent />} />
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

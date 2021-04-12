import React from "react";
import Header from "./Header";
import { State, UserAuthData } from "../../redux/redux-store";
import { connect } from "react-redux";
import {
  getUserAuthorisation,
  setAuthUserData,
} from "../../redux/auth-reducer";

interface HeaderComponentProps {
  setAuthUserData: (userAuth: UserAuthData) => void;
  userAuthData: UserAuthData;
  getUserAuthorisation: () => void;
}

class HeaderContainer extends React.Component<HeaderComponentProps> {
  componentDidMount() {
    this.props.getUserAuthorisation();
  }

  render() {
    return <Header {...this.props} />;
  }
}

const mapStateToProps = (state: State) => ({
  userAuthData: state.userAuth,
});
export default connect(mapStateToProps, {
  setAuthUserData,
  getUserAuthorisation,
})(HeaderContainer);

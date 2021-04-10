import React from "react";
import Header from "./Header";
import { State, UserAuthData } from "../../redux/redux-store";
import axios from "axios";
import { connect } from "react-redux";
import { setAuthUserData } from "../../redux/auth-reducer";

interface HeaderComponentProps {
  setAuthUserData: (userAuth: UserAuthData) => void;
  userAuthData: UserAuthData;
}

class HeaderContainer extends React.Component<HeaderComponentProps> {
  componentDidMount() {
    axios
      .get(`https://social-network.samuraijs.com/api/1.0/auth/me`, {
        withCredentials: true,
      })
      .then((response) => {
        if (response.data.resultCode === 0) {
          this.props.setAuthUserData(response.data.data);
        }
      });
  }

  render() {
    return <Header {...this.props} />;
  }
}
const mapStateToProps = (state: State) => ({
  userAuthData: state.userAuth,
});
export default connect(mapStateToProps, { setAuthUserData })(HeaderContainer);

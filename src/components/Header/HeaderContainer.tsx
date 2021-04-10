import React from "react";
import Header from "./Header";
import { State, UserAuthData } from "../../redux/redux-store";
import { connect } from "react-redux";
import { setAuthUserData } from "../../redux/auth-reducer";
import { authAPI } from "../../api/api";

interface HeaderComponentProps {
  setAuthUserData: (userAuth: UserAuthData) => void;
  userAuthData: UserAuthData;
}

class HeaderContainer extends React.Component<HeaderComponentProps> {
  componentDidMount() {
    authAPI.getCurrentUserAuthorization().then((data) => {
      if (data.resultCode === 0) {
        this.props.setAuthUserData(data.data);
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

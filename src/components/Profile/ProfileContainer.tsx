import React from "react";
import Profile from "./Profile";
import { connect } from "react-redux";
import { ProfileType, State } from "../../redux/redux-store";
import { getUserProfile, setUserProfile } from "../../redux/profile-reducer";
import { Redirect, withRouter } from "react-router-dom";
import { RouteComponentProps } from "react-router";

interface ProfileComponentProps
  extends RouteComponentProps<{ userId: string }> {
  profile: ProfileType | undefined;
  getUserProfile: (userId: string) => void;
  isAuth: boolean;
}

class ProfileContainer extends React.Component<ProfileComponentProps> {
  componentDidMount() {
    let userId = this.props.match.params.userId;
    this.props.getUserProfile(userId);
  }

  render() {
    if (!this.props.isAuth) {
      return <Redirect to={"/login"} />;
    }

    if (this.props.profile === undefined) {
      return null;
    }

    return (
      <>
        <Profile profile={this.props.profile} />
      </>
    );
  }
}

let mapStateToProps = (state: State) => ({
  profile: state.profilePage.profile,
  isAuth: state.userAuth.isAuth,
});

let WithUrlDataContainerComponent = withRouter(ProfileContainer);
export default connect(mapStateToProps, { setUserProfile, getUserProfile })(
  WithUrlDataContainerComponent
);

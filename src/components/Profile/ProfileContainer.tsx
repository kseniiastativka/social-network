import React from "react";
import Profile from "./Profile";
import { connect } from "react-redux";
import { ProfileType, State } from "../../redux/redux-store";
import { getUserProfile, setUserProfile } from "../../redux/profile-reducer";
import { withRouter } from "react-router-dom";
import { RouteComponentProps } from "react-router";
import { withAuthRedirect } from "../hoc/withAuthRedirect";

interface ProfileComponentProps
  extends RouteComponentProps<{ userId: string }> {
  profile: ProfileType | undefined;
  getUserProfile: (userId: string) => void;
}

class ProfileContainer extends React.Component<ProfileComponentProps> {
  componentDidMount() {
    let userId = this.props.match.params.userId;
    this.props.getUserProfile(userId);
  }

  render() {
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

let AuthRedirectComponent = withAuthRedirect(ProfileContainer);

let mapStateToProps = (state: State) => ({
  profile: state.profilePage.profile,
});

let WithUrlDataContainerComponent = withRouter(AuthRedirectComponent);

export default connect(mapStateToProps, { setUserProfile, getUserProfile })(
  WithUrlDataContainerComponent
);

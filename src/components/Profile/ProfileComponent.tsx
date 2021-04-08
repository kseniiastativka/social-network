import React from "react";
import Profile from "./Profile";
import axios from "axios";
import { connect } from "react-redux";
import { ProfileType, State } from "../../redux/redux-store";
import { setUserProfile } from "../../redux/profile-reducer";
import { withRouter } from "react-router-dom";
import { RouteComponentProps } from "react-router";

interface ProfileComponentProps
  extends RouteComponentProps<{ userId: string }> {
  setUserProfile: (profile: ProfileType) => void;
  profile: ProfileType | undefined;
}

class ProfileComponent extends React.Component<ProfileComponentProps> {
  componentDidMount() {
    let userId = this.props.match.params.userId;
    if (!userId) {
      userId = "2";
    }
    axios
      .get(`https://social-network.samuraijs.com/api/1.0/profile/` + userId)
      .then((response) => {
        this.props.setUserProfile(response.data);
      });
  }

  render() {
    if (this.props.profile === undefined) {
      return null;
    }

    return (
      <>
        <Profile {...this.props} profile={this.props.profile} />
      </>
    );
  }
}

let mapStateToProps = (state: State) => ({
  profile: state.profilePage.profile,
});

let WithUrlDataContainerComponent = withRouter(ProfileComponent);
export default connect(mapStateToProps, { setUserProfile })(
  WithUrlDataContainerComponent
);

import React from "react";
import Profile from "./Profile";
import axios from "axios";
import { connect } from "react-redux";
import { ProfileType, State } from "../../redux/redux-store";
import { profileReducer, setUserProfile } from "../../redux/profile-reducer";

class ProfileComponent extends React.Component<{
  setUserProfile: (profile: ProfileType) => void;
  profile: ProfileType | undefined;
}> {
  componentDidMount() {
    axios
      .get(`https://social-network.samuraijs.com/api/1.0/profile/2`)
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
export default connect(mapStateToProps, { setUserProfile })(ProfileComponent);

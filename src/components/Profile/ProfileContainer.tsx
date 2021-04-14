import React, { ComponentType } from "react";
import Profile from "./Profile";
import { connect } from "react-redux";
import { ProfileType, State } from "../../redux/redux-store";
import { getUserProfile } from "../../redux/profile-reducer";
import { withRouter } from "react-router-dom";
import { RouteComponentProps } from "react-router";
import { withAuthRedirect } from "../hoc/withAuthRedirect";
import { compose } from "redux";

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

let mapStateToProps = (state: State) => ({
  profile: state.profilePage.profile,
});

export default compose<
  ComponentType<ProfileComponentProps>,
  ComponentType<{
    profile: ProfileType | undefined;
    getUserProfile: (userId: string) => void;
  }>,
  ComponentType<ProfileComponentProps>,
  ComponentType<{}>
>(
  connect(mapStateToProps, { getUserProfile }),
  withRouter,
  withAuthRedirect
)(ProfileContainer);

import React, { ComponentType } from "react";
import Profile from "./Profile";
import { connect } from "react-redux";
import { ProfilePage, ProfileType, State } from "../../redux/redux-store";
import {
  getUserProfile,
  getUserStatus,
  updateUserStatus,
} from "../../redux/profile-reducer";
import { withRouter } from "react-router-dom";
import { RouteComponentProps } from "react-router";
import { withAuthRedirect } from "../hoc/withAuthRedirect";
import { compose } from "redux";

interface ProfileComponentProps
  extends RouteComponentProps<{ userId: string }> {
  profile: ProfileType | undefined;
  getUserProfile: (userId: string) => void;
  getUserStatus: (userId: string) => void;
  updateUserStatus: (status: string) => void;
  status: ProfilePage["status"];
}

class ProfileContainer extends React.Component<ProfileComponentProps> {
  componentDidMount() {
    let userId = this.props.match.params.userId;
    this.props.getUserProfile(userId);
    this.props.getUserStatus(userId);
  }

  render() {
    if (this.props.profile === undefined) {
      return null;
    }

    return (
      <>
        <Profile
          profile={this.props.profile}
          status={this.props.status}
          updateUserStatus={this.props.updateUserStatus}
        />
      </>
    );
  }
}

let mapStateToProps = (state: State) => ({
  profile: state.profilePage.profile,
  status: state.profilePage.status,
});

export default compose<
  ComponentType<ProfileComponentProps>,
  ComponentType<{
    profile: ProfileType | undefined;
    getUserProfile: (userId: string) => void;
    getUserStatus: (userId: string) => void;
    updateUserStatus: (status: string) => void;
    status: ProfilePage["status"];
  }>,
  ComponentType<ProfileComponentProps>,
  ComponentType<{}>
>(
  connect(mapStateToProps, { getUserProfile, getUserStatus, updateUserStatus }),
  withRouter,
  withAuthRedirect
)(ProfileContainer);

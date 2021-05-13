import React, { ComponentType } from "react";
import Profile from "./Profile";
import { connect } from "react-redux";
import { ProfilePage, ProfileType, State } from "../../redux/redux-store";
import {
  getUserProfile,
  getUserStatus,
  savePhoto,
  saveProfile,
  updateUserStatus,
} from "../../redux/profile-reducer";
import { withRouter } from "react-router-dom";
import { RouteComponentProps } from "react-router";
import { compose } from "redux";

interface ProfileComponentProps
  extends RouteComponentProps<{ userId: string }> {
  profile: ProfileType | undefined;
  getUserProfile: (userId: string) => void;
  getUserStatus: (userId: string) => void;
  updateUserStatus: (status: string) => void;
  status: ProfilePage["status"];
  authorizedUserID: number | undefined;
  isAuth: boolean;
  savePhoto: (file: File) => void;
  saveProfile: (profile: ProfileType) => Promise<unknown>;
}

class ProfileContainer extends React.Component<ProfileComponentProps> {
  refreshProfile() {
    let userId = this.props.match.params.userId;
    if (!userId) {
      userId = this.props.authorizedUserID?.toString() ?? "";
      if (!userId) {
        this.props.history.push("/login");
      }
    }
    this.props.getUserProfile(userId);
    this.props.getUserStatus(userId);
  }

  componentDidMount() {
    this.refreshProfile();
  }

  componentDidUpdate(
    prevProps: Readonly<ProfileComponentProps>,
    prevState: Readonly<{}>,
    snapshot?: any
  ) {
    if (this.props.match.params.userId !== prevProps.match.params.userId) {
      this.refreshProfile();
    }
  }

  render() {
    if (this.props.profile === undefined) {
      return null;
    }

    return (
      <>
        <Profile
          isOwner={!this.props.match.params.userId}
          profile={this.props.profile}
          status={this.props.status}
          updateUserStatus={this.props.updateUserStatus}
          savePhoto={this.props.savePhoto}
          saveProfile={this.props.saveProfile}
        />
      </>
    );
  }
}

let mapStateToProps = (state: State) => ({
  profile: state.profilePage.profile,
  status: state.profilePage.status,
  authorizedUserID: state.userAuth.id,
  isAuth: state.userAuth.isAuth,
});

export default compose<
  ComponentType<{
    profile: ProfileType | undefined;
    getUserProfile: (userId: string) => void;
    getUserStatus: (userId: string) => void;
    updateUserStatus: (status: string) => void;
    status: ProfilePage["status"];
    authorizedUserID: number | undefined;
    isAuth: boolean;
    savePhoto: (file: File) => void;
    saveProfile: (profile: ProfileType) => Promise<unknown>;
  }>,
  ComponentType<ProfileComponentProps>,
  ComponentType<{}>
>(
  connect(mapStateToProps, {
    getUserProfile,
    getUserStatus,
    updateUserStatus,
    savePhoto,
    saveProfile,
  }),
  withRouter
)(ProfileContainer);

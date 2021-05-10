import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import React, { FC } from "react";
import { ProfilePage, ProfileType } from "../../redux/redux-store";

const Profile: FC<{
  profile: ProfileType;
  status: ProfilePage["status"];
  updateUserStatus: (status: string) => void;
  isOwner: boolean;
  savePhoto: (file: File) => void;
}> = (props) => {
  return (
    <>
      <ProfileInfo
        profile={props.profile}
        status={props.status}
        updateUserStatus={props.updateUserStatus}
        isOwner={props.isOwner}
        savePhoto={props.savePhoto}
      />
      <MyPostsContainer />
    </>
  );
};

export default Profile;

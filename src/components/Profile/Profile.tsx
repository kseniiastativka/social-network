import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import React, { FC } from "react";
import { ProfilePage, ProfileType } from "../../redux/redux-store";

const Profile: FC<{
  profile: ProfileType;
  status: ProfilePage["status"];
  updateUserStatus: (status: string) => void;
}> = (props) => {
  return (
    <>
      <ProfileInfo
        profile={props.profile}
        status={props.status}
        updateUserStatus={props.updateUserStatus}
      />
      <MyPostsContainer />
    </>
  );
};

export default Profile;

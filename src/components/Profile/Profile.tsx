import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import React, { FC } from "react";
import { ProfileType } from "../../redux/redux-store";

const Profile: FC<{ profile: ProfileType }> = (props) => {
  return (
    <>
      <ProfileInfo profile={props.profile} />
      <MyPostsContainer />
    </>
  );
};
export default Profile;

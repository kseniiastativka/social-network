import React from "react";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import { Action, Store } from "../../redux/redux-store";

const Profile = () => {
  return (
    <>
      <ProfileInfo />
      <MyPostsContainer />
    </>
  );
};
export default Profile;

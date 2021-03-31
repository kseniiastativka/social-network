import React from "react";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import { Action } from "../../redux/store";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import { Store } from "../../redux/redux-store";

const Profile = (props: { store: Store }) => {
  return (
    <>
      <ProfileInfo />
      <MyPostsContainer store={props.store} />
    </>
  );
};
export default Profile;

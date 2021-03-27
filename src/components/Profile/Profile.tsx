import React from "react";
import MyPosts from "./MyPosts/MyPosts";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import { Action } from "../../redux/state";

const Profile = (props: {
  profilePage: {
    posts: { message: string; likesCount: number }[];
    newPostText: string;
  };
  dispatch: (action: Action) => void;
}) => {
  return (
    <>
      <ProfileInfo />
      <MyPosts
        posts={props.profilePage.posts}
        newPostText={props.profilePage.newPostText}
        dispatch={props.dispatch}
      />
    </>
  );
};
export default Profile;

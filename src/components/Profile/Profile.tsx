import React from "react";
import MyPosts from "./MyPosts/MyPosts";
import ProfileInfo from "./ProfileInfo/ProfileInfo";

const Profile = (props: {
  profilePage: {
    posts: { message: string; likesCount: number }[];
    newPostText: string;
  };
  addPosts: () => void;
  updateNewPostText: (updatedText: string) => void;
}) => {
  return (
    <>
      <ProfileInfo />
      <MyPosts
        posts={props.profilePage.posts}
        addPosts={props.addPosts}
        newPostText={props.profilePage.newPostText}
        updateNewPostText={props.updateNewPostText}
      />
    </>
  );
};
export default Profile;

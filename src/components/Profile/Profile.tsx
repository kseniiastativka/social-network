import React from "react";
import MyPosts from "./MyPosts/MyPosts";
import ProfileInfo from "./ProfileInfo/ProfileInfo";

const Profile = (props: {
  state: {
    posts: { message: string; likesCount: number }[];
  };
  addPosts: (post: string) => void;
}) => {
  return (
    <>
      <ProfileInfo />
      <MyPosts posts={props.state.posts} addPosts={props.addPosts} />
    </>
  );
};
export default Profile;

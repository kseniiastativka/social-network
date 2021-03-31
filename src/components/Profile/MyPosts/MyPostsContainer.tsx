import React from "react";
import {
  addPostActionCreator,
  updateNewPostActionCreator,
} from "../../../redux/profile-reducer";
import MyPosts from "./MyPosts";
import { Store } from "../../../redux/redux-store";

const MyPostsContainer = (props: { store: Store }) => {
  let state = props.store.getState();
  let addPost = () => {
    props.store.dispatch(addPostActionCreator());
  };

  let onPostChange = (text: string) => {
    props.store.dispatch(updateNewPostActionCreator(text));
  };

  return (
    <MyPosts
      addPost={addPost}
      updateNewPostText={onPostChange}
      posts={state.profilePage.posts}
      newPostText={state.profilePage.newPostText}
    />
  );
};
export default MyPostsContainer;

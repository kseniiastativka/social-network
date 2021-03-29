import React from "react";
import s from "./MyPosts.module.css";
import Post from "./Post/Post";
import { Action } from "../../../redux/store";
import {
  addPostActionCreator,
  updateNewPostActionCreator,
} from "../../../redux/profile-reducer";

const MyPosts = (props: {
  posts: { message: string; likesCount: number }[];
  dispatch: (action: Action) => void;
  newPostText: string;
}) => {
  let postElements = props.posts.map((post) => (
    <Post message={post.message} likesCount={post.likesCount} />
  ));

  let newPostsElement = React.createRef<any>();

  let addPost = () => {
    props.dispatch(addPostActionCreator());
  };

  let onPostChange = () => {
    let text = newPostsElement.current.value;
    props.dispatch(updateNewPostActionCreator(text));
  };

  return (
    <div className={s.postsBlock}>
      <h3>MY POSTS</h3>
      <div>
        <textarea
          ref={newPostsElement}
          onChange={onPostChange}
          value={props.newPostText}
        ></textarea>
      </div>
      <div>
        <button onClick={addPost}>Add post</button>
      </div>
      <div className={s.posts}>{postElements}</div>
    </div>
  );
};
export default MyPosts;

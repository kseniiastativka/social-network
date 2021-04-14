import React from "react";
import s from "./MyPosts.module.css";
import Post from "./Post/Post";

const MyPosts = (props: {
  posts: { message: string; likesCount: number }[];
  addPost: () => void;
  updateNewPostText: (text: string) => void;
  newPostText: string;
}) => {
  let postElements = props.posts.map((post) => (
    <Post
      key={post.message}
      message={post.message}
      likesCount={post.likesCount}
    />
  ));

  let newPostsElement = React.createRef<any>();

  let addPost = () => {
    props.addPost();
  };

  let onPostChange = () => {
    let text = newPostsElement.current.value;
    props.updateNewPostText(text);
  };

  return (
    <div className={s.postsBlock}>
      <h3>MY POSTS</h3>
      <div>
        <textarea
          ref={newPostsElement}
          onChange={onPostChange}
          value={props.newPostText}
        />
      </div>
      <div>
        <button onClick={addPost}>Add post</button>
      </div>
      <div className={s.posts}>{postElements}</div>
    </div>
  );
};
export default MyPosts;

import React from "react";
import s from "./MyPosts.module.css";
import Post from "./Post/Post";

const MyPosts = (props: {
  posts: { message: string; likesCount: number }[];
  newPostText: string;
  addPosts: () => void;
  updateNewPostText: (updatedText: string) => void;
}) => {
  let postElements = props.posts.map((post) => (
    <Post message={post.message} likesCount={post.likesCount} />
  ));

  let newPostsElement = React.createRef<any>();

  let addPost = () => {
    props.addPosts();
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

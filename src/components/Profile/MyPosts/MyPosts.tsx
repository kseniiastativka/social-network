import React from "react";
import s from './MyPosts.module.css'
import Post from "./Post/Post";

const MyPosts = () => {
    return (
        <div>MY POSTS
            <textarea></textarea>
            <button>Add post</button>
            <Post message='Miss me?' likesCount='12'/>
            <Post message='I have a vacation soon!' likesCount='34'/>
            <Post message='I want banana bread' likesCount='7'/>
        </div>

    )
}
export default MyPosts

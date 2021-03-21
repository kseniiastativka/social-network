import React from "react";
import s from './MyPosts.module.css'
import Post from "./Post/Post";

const MyPosts = () => {
    return (
        <div className={s.postsBlock}>
            <h3>MY POSTS</h3>
            <div>
                <textarea></textarea>
            </div>
            <div>
                <button>Add post</button>
            </div>
            <div className={s.posts}>
                <Post message='Miss me?' likesCount='12'/>
                <Post message='I have a vacation soon!' likesCount='34'/>
                <Post message='I want banana bread' likesCount='7'/>
            </div>
        </div>

    )
}
export default MyPosts

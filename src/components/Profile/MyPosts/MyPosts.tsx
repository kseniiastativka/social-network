import React from "react";
import s from './MyPosts.module.css'
import Post from "./Post/Post";

const MyPosts = () => {
    let posts =[
        {id:1, message:'Miss me?', likesCount:12},
        {id:2, message:'I have a vacation soon!', likesCount: 34},
        {id:3, message:'I want banana bread',likesCount: 7},
    ]

    let postElements = posts.map(post=><Post message={post.message} likesCount={post.likesCount}/>)
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
                {postElements}
            </div>
        </div>

    )
}
export default MyPosts

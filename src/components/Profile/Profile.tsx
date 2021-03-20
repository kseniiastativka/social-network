import React from "react";
import MyPosts from "./MyPosts/MyPosts";

const Profile = () => {
    return (<>
        <div >
            <img width='800'
                 src="https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg"
                 alt=""/>
        </div>

        <div>ava + description</div>
        <MyPosts/>
    </>)
}
export default Profile

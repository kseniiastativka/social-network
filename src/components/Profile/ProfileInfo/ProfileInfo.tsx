import React from "react";
import s from './ProfileInfo.module.css'

const ProfileInfo = () => {
    return (<>
        <div >
            <img width='800'
                 src="https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg"
                 alt=""/>
        </div>

        <div className={s.descriptionBlock}>ava + description</div>
    </>)
}
export default ProfileInfo

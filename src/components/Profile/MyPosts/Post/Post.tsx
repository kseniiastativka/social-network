import React from "react";
import s from './Post.module.css'

const Post = (props:{message:string; likesCount:string}) => {
    return (
        <div className={s.item}>
            <img
                src="https://img.netzwelt.de/dw1200_dh900_sw1440_sh1080_sx240_sy0_sr4x3_nu0/picture/original/2019/12/avatar-267247.jpeg"
                alt=""/>
            {props.message}
            <div>
                <span>like </span> {props.likesCount}
            </div>
        </div>


    )
}
export default Post

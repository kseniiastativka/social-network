import s from "./Friends.module.css";
import React from "react";

const Friends = (props: {
  friends: { id: number; name: string; img: string }[];
}) => {
  return (
    <div className={s.friends}>
      {props.friends.map((friend) => (
        <div className={s.friend} key={friend.id}>
          <img src={friend.img} alt="" />
          <div className={s.friendName}>{friend.name}</div>
        </div>
      ))}
    </div>
  );
};

export default Friends;

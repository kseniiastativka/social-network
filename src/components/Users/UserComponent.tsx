import styles from "./Users.module.css";
import userPhoto from "../../assets/images/female.png";
import React from "react";
import { User } from "../../redux/redux-store";
import { NavLink } from "react-router-dom";

let UserComponent = ({
  user,
  isFollowingInProgress,
  unfollow,
  follow,
}: {
  user: User;
  follow: (id: number) => void;
  unfollow: (id: number) => void;
  isFollowingInProgress: Array<User["id"]>;
}) => {
  return (
    <div>
      <span>
        <div>
          <NavLink to={"/profile/" + user.id}>
            <img
              src={user.photos.small !== null ? user.photos.small : userPhoto}
              alt=""
              className={styles.userPhoto}
            />
          </NavLink>
        </div>
        <div>
          {user.followed ? (
            <button
              disabled={isFollowingInProgress.some((id) => id === user.id)}
              onClick={() => {
                unfollow(user.id);
              }}
            >
              Unfollow
            </button>
          ) : (
            <button
              disabled={isFollowingInProgress.some((id) => id === user.id)}
              onClick={() => {
                follow(user.id);
              }}
            >
              Follow
            </button>
          )}
        </div>
      </span>
      <span>
        <span>
          <div>{user.name}</div>
          <div>{user.status}</div>
        </span>
        <span>
          <div>'user.location.country'</div>
          <div>'user.location.city'</div>
        </span>
      </span>
    </div>
  );
};

export default UserComponent;

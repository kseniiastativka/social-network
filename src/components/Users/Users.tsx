import styles from "./Users.module.css";
import userPhoto from "../../assets/images/female.png";
import React from "react";
import { User } from "../../redux/redux-store";
import { NavLink } from "react-router-dom";
import { followUnfollowAPI } from "../../api/api";

let Users = (props: {
  users: User[];
  totalUsersCount: number;
  pageSize: number;
  currentPage: number;
  follow: (id: number) => void;
  unfollow: (id: number) => void;
  onPageChanged: (page: number) => void;
}) => {
  let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
  let pages = [];
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }
  return (
    <div>
      <div>
        {pages.map((page) => {
          return (
            <span
              key={page}
              className={
                props.currentPage === page ? styles.selectedPage : undefined
              }
              onClick={() => {
                props.onPageChanged(page);
              }}
            >
              {page}
            </span>
          );
        })}
      </div>
      {props.users.map((user) => (
        <div key={user.id}>
          <span>
            <div>
              <NavLink to={"/profile/" + user.id}>
                <img
                  src={
                    user.photos.small !== null ? user.photos.small : userPhoto
                  }
                  alt=""
                  className={styles.userPhoto}
                />
              </NavLink>
            </div>
            <div>
              {user.followed ? (
                <button
                  onClick={() => {
                    followUnfollowAPI.unfollow(user.id).then((data) => {
                      if (data.resultCode === 0) {
                        props.unfollow(user.id);
                      }
                    });
                  }}
                >
                  Unfollow
                </button>
              ) : (
                <button
                  onClick={() => {
                    followUnfollowAPI.follow(user.id).then((data) => {
                      if (data.resultCode === 0) {
                        props.follow(user.id);
                      }
                    });
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
      ))}
      Users
    </div>
  );
};

export default Users;

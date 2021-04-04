import React, { useEffect } from "react";
import { User } from "../../redux/redux-store";
import styles from "./Users.module.css";
import axios from "axios";
import userPhoto from "../../assets/images/female.png";

type UsersProps = {
  users: User[];
  follow: (id: number) => void;
  unfollow: (id: number) => void;
  setUsers: (users: User[]) => void;
};

class Users extends React.Component<UsersProps, any> {
  constructor(props: UsersProps) {
    super(props);
    axios
      .get("https://social-network.samuraijs.com/api/1.0/users")
      .then((response) => {
        this.props.setUsers(response.data.items);
      });
  }
  render() {
    return (
      <div>
        {this.props.users.map((user) => (
          <div key={user.id}>
            <span>
              <div>
                <img
                  src={
                    user.photos.small !== null ? user.photos.small : userPhoto
                  }
                  alt=""
                  className={styles.userPhoto}
                />
              </div>
              <div>
                {user.followed ? (
                  <button onClick={() => this.props.unfollow(user.id)}>
                    Unfollow
                  </button>
                ) : (
                  <button onClick={() => this.props.follow(user.id)}>
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
  }
}

export default Users;

import { useEffect } from "react";
import { User } from "../../redux/redux-store";
import styles from "./Users.module.css";
import axios from "axios";
import userPhoto from "../../assets/images/female.png";

let Users = (props: {
  users: User[];
  follow: (id: number) => void;
  unfollow: (id: number) => void;
  setUsers: (users: User[]) => void;
}) => {
  useEffect(() => {
    if (props.users.length === 0) {
      axios
        .get("https://social-network.samuraijs.com/api/1.0/users")
        .then((response) => {
          props.setUsers(response.data.items);
        });
    }
  }, [props.users.length]);

  return (
    <div>
      {props.users.map((user) => (
        <div key={user.id}>
          <span>
            <div>
              <img
                src={user.photos.small != null ? user.photos.small : userPhoto}
                alt=""
                className={styles.userPhoto}
              />
            </div>
            <div>
              {user.followed ? (
                <button onClick={() => props.unfollow(user.id)}>
                  Unfollow
                </button>
              ) : (
                <button onClick={() => props.follow(user.id)}>Follow</button>
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

function foo() {
  console.log("foo");
}

import { useEffect } from "react";
import { User } from "../../redux/redux-store";
import styles from "./Users.module.css";

let Users = (props: {
  users: User[];
  follow: (id: number) => void;
  unfollow: (id: number) => void;
  setUsers: (users: User[]) => void;
}) => {
  useEffect(() => {
    if (props.users.length === 0) {
      props.setUsers([
        {
          id: 1,
          photo:
            "https://e7.pngegg.com/pngimages/773/597/png-clipart-echeveria-succulent-plant-cactaceae-houseleek-suculent-flower-cactus-garden.png",
          followed: true,
          fullName: "Kseniia S",
          status: "I'm learning React",
          location: { city: "Berlin", country: "Germany" },
        },
        {
          id: 2,
          photo:
            "https://e7.pngegg.com/pngimages/773/597/png-clipart-echeveria-succulent-plant-cactaceae-houseleek-suculent-flower-cactus-garden.png",
          followed: false,
          fullName: "Yevhen S",
          status: "I'm one of the best Frontend developers",
          location: { city: "Berlin", country: "Germany" },
        },
        {
          id: 3,
          photo:
            "https://e7.pngegg.com/pngimages/773/597/png-clipart-echeveria-succulent-plant-cactaceae-houseleek-suculent-flower-cactus-garden.png",
          followed: true,
          fullName: "Vasiliy R",
          status: "I like to cook",
          location: { city: "Kyiv", country: "Ukraine" },
        },
        {
          id: 4,
          photo:
            "https://e7.pngegg.com/pngimages/773/597/png-clipart-echeveria-succulent-plant-cactaceae-houseleek-suculent-flower-cactus-garden.png",
          followed: false,
          fullName: "Anna M",
          status: "I'm waiting a baby",
          location: { city: "Oryol", country: "Russia" },
        },
      ]);
    }
  }, [props.users.length]);

  return (
    <div>
      {props.users.map((user) => (
        <div key={user.id}>
          <span>
            <div>
              <img src={user.photo} alt="" className={styles.userPhoto} />
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
              <div>{user.fullName}</div>
              <div>{user.status}</div>
            </span>
            <span>
              <div>{user.location.country}</div>
              <div>{user.location.city}</div>
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

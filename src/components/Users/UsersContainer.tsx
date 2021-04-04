import { connect } from "react-redux";
import { Dispatch, State, User } from "../../redux/redux-store";
import { followAC, setUsersAC, unfollowAC } from "../../redux/users-reducer";
import Users from "./Users";

let mapStateToProps = (state: State) => {
  return { users: state.usersPage.users };
};

let mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    follow: (userId: number) => {
      dispatch(followAC(userId));
    },
    unfollow: (userId: number) => {
      dispatch(unfollowAC(userId));
    },
    setUsers: (users: User[]) => {
      dispatch(setUsersAC(users));
    },
  };
};
const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(Users);
export default UsersContainer;

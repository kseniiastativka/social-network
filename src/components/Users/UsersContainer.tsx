import { connect } from "react-redux";
import { State, User } from "../../redux/redux-store";
import {
  follow,
  setCurrentPage,
  setTotalUsersCount,
  setUsers,
  toggleIsFetching,
  toggleIsFollowing,
  unfollow,
} from "../../redux/users-reducer";
import React from "react";
import Users from "./Users";
import Spinner from "../common/Spinner/Spinner";
import { usersAPI } from "../../api/api";

type UsersProps = {
  users: User[];
  totalUsersCount: number;
  pageSize: number;
  currentPage: number;
  setCurrentPage: (currentPage: number) => void;
  follow: (id: number) => void;
  unfollow: (id: number) => void;
  setUsers: (users: User[]) => void;
  setTotalUsersCount: (setTotalUsersCount: number) => void;
  isFetching: boolean;
  toggleIsFetching: (isFetching: boolean) => void;

  toggleIsFollowing: (
    isFollowingInProgress: boolean,
    userId: User["id"]
  ) => void;

  followingInProgress: Array<User["id"]>;
};

class UsersContainer extends React.Component<UsersProps, any> {
  componentDidMount() {
    this.props.toggleIsFetching(true);
    usersAPI
      .getUsers(this.props.currentPage, this.props.pageSize)
      .then((data) => {
        this.props.toggleIsFetching(false);
        this.props.setUsers(data.items);
        this.props.setTotalUsersCount(data.totalCount);
      });
  }

  onPageChanged = (page: number) => {
    this.props.toggleIsFetching(true);
    this.props.setCurrentPage(page);
    usersAPI.getUsers(page, this.props.pageSize).then((data) => {
      this.props.toggleIsFetching(false);
      this.props.setUsers(data.items);
    });
  };

  render() {
    return (
      <>
        {this.props.isFetching ? <Spinner /> : null}
        <Users
          totalUsersCount={this.props.totalUsersCount}
          pageSize={this.props.pageSize}
          currentPage={this.props.currentPage}
          onPageChanged={this.onPageChanged}
          users={this.props.users}
          follow={this.props.follow}
          unfollow={this.props.unfollow}
          toggleIsFollowing={this.props.toggleIsFollowing}
          isFollowingInProgress={this.props.followingInProgress}
        />
      </>
    );
  }
}

let mapStateToProps = (state: State) => {
  return {
    users: state.usersPage.users,
    pageSize: state.usersPage.pageSize,
    totalUsersCount: state.usersPage.totalUsersCount,
    currentPage: state.usersPage.currentPage,
    isFetching: state.usersPage.isFetching,
    followingInProgress: state.usersPage.followingInProgress,
  };
};

export default connect(mapStateToProps, {
  follow,
  unfollow,
  setUsers,
  setCurrentPage,
  setTotalUsersCount,
  toggleIsFetching,
  toggleIsFollowing,
})(UsersContainer);

import { connect } from "react-redux";
import { State, User } from "../../redux/redux-store";
import {
  follow,
  getUsers,
  setCurrentPage,
  unfollow,
} from "../../redux/users-reducer";
import React from "react";
import Users from "./Users";
import Spinner from "../common/Spinner/Spinner";

type UsersProps = {
  users: User[];
  totalUsersCount: number;
  pageSize: number;
  currentPage: number;
  setCurrentPage: (currentPage: number) => void;
  follow: (id: number) => void;
  unfollow: (id: number) => void;
  isFetching: boolean;
  getUsers: (currentPage: number, pageSize: number) => void;
  followingInProgress: Array<User["id"]>;
};

class UsersContainer extends React.Component<UsersProps, any> {
  componentDidMount() {
    this.props.getUsers(this.props.currentPage, this.props.pageSize);
  }

  onPageChanged = (page: number) => {
    this.props.setCurrentPage(page);
    this.props.getUsers(page, this.props.pageSize);
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
  setCurrentPage,
  getUsers,
})(UsersContainer);

import { connect } from "react-redux";
import { Dispatch, State, User } from "../../redux/redux-store";
import {
  followAC,
  setCurrentPageAC,
  setTotalUsersCountAC,
  setUsersAC,
  toggleIsFetchingAC,
  unfollowAC,
} from "../../redux/users-reducer";
import React from "react";
import axios from "axios";
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
  setUsers: (users: User[]) => void;
  setTotalUsersCount: (setTotalUsersCount: number) => void;
  isFetching: boolean;
  toggleIsFetching: (isFetching: boolean) => void;
};

class UsersContainer extends React.Component<UsersProps, any> {
  componentDidMount() {
    this.props.toggleIsFetching(true);
    axios
      .get(
        `https://social-network.samuraijs.com/api/1.0/users?page=${this.props.setCurrentPage}&count=${this.props.pageSize}`
      )
      .then((response) => {
        this.props.toggleIsFetching(false);
        this.props.setUsers(response.data.items);
        this.props.setTotalUsersCount(response.data.totalCount);
      });
  }

  onPageChanged = (page: number) => {
    this.props.toggleIsFetching(true);
    this.props.setCurrentPage(page);
    axios
      .get(
        `https://social-network.samuraijs.com/api/1.0/users?page=${page}&count=${this.props.pageSize}`
      )
      .then((response) => {
        this.props.toggleIsFetching(false);
        this.props.setUsers(response.data.items);
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
  };
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
    setCurrentPage: (page: number) => {
      dispatch(setCurrentPageAC(page));
    },
    setTotalUsersCount: (totalUsersCount: number) => {
      dispatch(setTotalUsersCountAC(totalUsersCount));
    },
    toggleIsFetching: (isFetching: boolean) => {
      dispatch(toggleIsFetchingAC(isFetching));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer);

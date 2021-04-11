import { Action, Dispatch, State, User } from "./redux-store";
import { followUnfollowAPI, usersAPI } from "../api/api";

let initialState: State["usersPage"] = {
  users: [],
  pageSize: 5,
  totalUsersCount: 0,
  currentPage: 1,
  isFetching: false,
  followingInProgress: [],
};

export const usersReducer = (
  state: State["usersPage"] = initialState,
  action: Action
) => {
  switch (action.type) {
    case "FOLLOW":
      return {
        ...state,
        users: state.users.map((user) => {
          if (user.id === action.userId) {
            return { ...user, followed: true };
          }
          return user;
        }),
      };
    case "UNFOLLOW":
      return {
        ...state,
        users: state.users.map((user) => {
          if (user.id === action.userId) {
            return { ...user, followed: false };
          }
          return user;
        }),
      };

    case "SET_USERS": {
      return {
        ...state,
        users: action.users,
      };
    }

    case "SET_CURRENT_PAGE": {
      return {
        ...state,
        currentPage: action.currentPage,
      };
    }

    case "SET_TOTAL_USERS_COUNT": {
      return {
        ...state,
        totalUsersCount: action.totalUsersCount,
      };
    }
    case "TOGGLE_IS_FETCHING": {
      return {
        ...state,
        isFetching: action.isFetching,
      };
    }

    case "TOGGLE_IS_FOLLOWING": {
      return {
        ...state,
        followingInProgress: action.isFollowingInProgress
          ? [...state.followingInProgress, action.userId]
          : state.followingInProgress.filter((id) => id !== action.userId),
      };
    }

    default:
      return state;
  }
};

export const followSuccess = (userId: number) =>
  ({ type: "FOLLOW", userId } as const);
export const unfollowSuccess = (userId: number) =>
  ({ type: "UNFOLLOW", userId } as const);
export const setUsers = (users: User[]) =>
  ({ type: "SET_USERS", users } as const);
export const setCurrentPage = (currentPage: number) =>
  ({ type: "SET_CURRENT_PAGE", currentPage } as const);
export const setTotalUsersCount = (totalUsersCount: number) =>
  ({ type: "SET_TOTAL_USERS_COUNT", totalUsersCount } as const);
export const toggleIsFetching = (isFetching: boolean) =>
  ({ type: "TOGGLE_IS_FETCHING", isFetching } as const);
export const toggleIsFollowing = (
  isFollowingInProgress: boolean,
  userId: User["id"]
) =>
  ({
    type: "TOGGLE_IS_FOLLOWING",
    isFollowingInProgress: isFollowingInProgress,
    userId: userId,
  } as const);

export const getUsers = (currentPage: number, pageSize: number) => {
  return (dispatch: Dispatch) => {
    dispatch(toggleIsFetching(true));
    usersAPI.getUsers(currentPage, pageSize).then((data) => {
      dispatch(toggleIsFetching(false));
      dispatch(setUsers(data.items));
      dispatch(setTotalUsersCount(data.totalCount));
    });
  };
};

export const follow = (userId: number) => {
  return (dispatch: Dispatch) => {
    dispatch(toggleIsFollowing(true, userId));
    followUnfollowAPI.follow(userId).then((data) => {
      if (data.resultCode === 0) {
        dispatch(followSuccess(userId));
      }
      dispatch(toggleIsFollowing(false, userId));
    });
  };
};

export const unfollow = (userId: number) => {
  return (dispatch: Dispatch) => {
    dispatch(toggleIsFollowing(true, userId));
    followUnfollowAPI.unfollow(userId).then((data) => {
      if (data.resultCode === 0) {
        dispatch(unfollowSuccess(userId));
      }
      dispatch(toggleIsFollowing(false, userId));
    });
  };
};

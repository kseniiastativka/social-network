import { Action, Dispatch, State, User } from "./redux-store";
import { followUnfollowAPI, usersAPI } from "../api/api";
import { updateObjInArray } from "../utils/object-helpers";

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
        users: updateObjInArray(state.users, action.userId, { followed: true }),
      };
    case "UNFOLLOW":
      return {
        ...state,
        users: updateObjInArray(state.users, action.userId, {
          followed: false,
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

export const requestUsers = (page: number, pageSize: number) => async (
  dispatch: Dispatch
) => {
  dispatch(toggleIsFetching(true));
  const data = await usersAPI.getUsers(page, pageSize);
  dispatch(toggleIsFetching(false));
  dispatch(setUsers(data.items));
  dispatch(setTotalUsersCount(data.totalCount));
};

const followUnfollowFlow = async (
  dispatch: Dispatch,
  userId: number,
  apiMethod: (userId: number) => Promise<any>,
  actionCreator: (userId: number) => Action
) => {
  dispatch(toggleIsFollowing(true, userId));
  const data = await apiMethod(userId);
  if (data.resultCode === 0) {
    dispatch(actionCreator(userId));
  }
  dispatch(toggleIsFollowing(false, userId));
};

export const follow = (userId: number) => async (dispatch: Dispatch) => {
  const apiMethod = followUnfollowAPI.follow.bind(followUnfollowAPI);
  await followUnfollowFlow(dispatch, userId, apiMethod, followSuccess);
};

export const unfollow = (userId: number) => async (dispatch: Dispatch) => {
  const apiMethod = followUnfollowAPI.unfollow.bind(followUnfollowAPI);
  await followUnfollowFlow(dispatch, userId, apiMethod, unfollowSuccess);
};

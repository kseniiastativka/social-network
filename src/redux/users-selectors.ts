import { State } from "./redux-store";

export const getUsersList = (state: State) => {
  return state.usersPage.users;
};

export const getPageSize = (state: State) => {
  return state.usersPage.pageSize;
};

export const getTotalUsersCount = (state: State) => {
  return state.usersPage.totalUsersCount;
};

export const getUsersCurrentPage = (state: State) => {
  return state.usersPage.currentPage;
};

export const isFetching = (state: State) => {
  return state.usersPage.isFetching;
};

export const getFollowingInProgress = (state: State) => {
  return state.usersPage.followingInProgress;
};

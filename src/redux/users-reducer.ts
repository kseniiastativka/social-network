import { Action, State, User } from "./redux-store";

let initialState = {
  users: [],
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
        users: [...state.users, ...action.users],
      };
    }

    default:
      return state;
  }
};

export const followAC = (userId: number) =>
  ({ type: "FOLLOW", userId } as const);
export const unfollowAC = (userId: number) =>
  ({ type: "UNFOLLOW", userId } as const);
export const setUsersAC = (users: User[]) =>
  ({ type: "SET_USERS", users } as const);

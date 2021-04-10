import { Action, State, User, UserAuthData } from "./redux-store";

let initialState = {
  id: undefined,
  email: undefined,
  login: undefined,
  isAuth: false,
};

export const authReducer = (
  state: State["userAuth"] = initialState,
  action: Action
) => {
  switch (action.type) {
    case "SET_USER_DATA":
      return {
        ...state,
        ...action.data,
        isAuth: true,
      };

    default:
      return state;
  }
};

export const setAuthUserData = (user: UserAuthData) => ({
  type: "SET_USER_DATA",
  data: user,
});

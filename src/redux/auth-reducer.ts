import { Action, Dispatch, State, UserAuthData } from "./redux-store";
import { authAPI } from "../api/api";

let initialState = {
  id: undefined,
  email: undefined,
  login: undefined,
  isAuth: false,
  loginErrorMessage: undefined,
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
      };
    case "SET-LOGIN-ERROR":
      return {
        ...state,
        loginErrorMessage: action.message,
      };
    default:
      return state;
  }
};

export const setAuthUserData = (user: UserAuthData) =>
  ({
    type: "SET_USER_DATA",
    data: user,
  } as const);

export const getUserAuthorisation = () => async (dispatch: Dispatch) => {
  let response = await authAPI.getCurrentUserAuthorization();
  if (response.resultCode === 0) {
    dispatch(setAuthUserData({ ...response.data, isAuth: true }));
  }
};

export const login = (userData: {
  email: string;
  password: string;
  rememberMe: boolean;
}) => async (dispatch: Dispatch) => {
  let response = await authAPI.login(userData);
  if (response.resultCode === 0) {
    // @ts-expect-error
    dispatch(getUserAuthorisation());
  } else {
    dispatch({
      type: "SET-LOGIN-ERROR",
      message: response.messages[0] ?? "Could not log in",
    });
  }
};

export const logout = () => async (dispatch: Dispatch) => {
  let response = await authAPI.logout();
  if (response.resultCode === 0) {
    dispatch(
      setAuthUserData({
        id: undefined,
        login: undefined,
        email: undefined,
        isAuth: false,
        loginErrorMessage: undefined,
      })
    );
  }
};

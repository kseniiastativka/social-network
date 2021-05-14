import { Action, Dispatch, State, UserAuthData } from "./redux-store";
import { authAPI, security } from "../api/api";

let initialState = {
  id: undefined,
  email: undefined,
  login: undefined,
  isAuth: false,
  loginErrorMessage: undefined,
  captchaUrl: undefined,
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
    case "GET-CAPTCHA-URL-SUCCESS":
      return {
        ...state,
        captchaUrl: action.payload,
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

export const getCaptchaUrlSuccess = (url: string) =>
  ({
    type: "GET-CAPTCHA-URL-SUCCESS",
    payload: url,
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
  captchaUrl: string | undefined;
}) => async (dispatch: Dispatch) => {
  let response = await authAPI.login(userData);
  if (response.resultCode === 0) {
    // @ts-expect-error
    dispatch(getUserAuthorisation());
  } else {
    if (response.resultCode === 10) {
      // @ts-expect-error
      dispatch(getCaptchaUrl());
    }
    dispatch({
      type: "SET-LOGIN-ERROR",
      message: response.messages[0] ?? "Could not log in",
    });
  }
};

export const getCaptchaUrl = () => async (dispatch: Dispatch) => {
  const response = await security.getCaptcha();
  const captchaUrl = response.url;
  dispatch(getCaptchaUrlSuccess(captchaUrl));
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
        captchaUrl: undefined,
      })
    );
  }
};

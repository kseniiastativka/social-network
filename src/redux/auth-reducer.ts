import { Action, Dispatch, State, UserAuthData } from "./redux-store";
import { authAPI } from "../api/api";

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

export const getUserAuthorisation = () => {
  return (dispatch: Dispatch) => {
    authAPI.getCurrentUserAuthorization().then((data) => {
      if (data.resultCode === 0) {
        dispatch(setAuthUserData({ ...data.data, isAuth: true }));
      }
    });
  };
};

export const login = (userData: {
  email: string;
  password: string;
  rememberMe: boolean;
}) => {
  return (dispatch: Dispatch) => {
    authAPI.login(userData).then((data) => {
      if (data.resultCode === 0) {
        // @ts-expect-error
        dispatch(getUserAuthorisation());
      }
    });
  };
};

export const logout = () => {
  return (dispatch: Dispatch) => {
    authAPI.logout().then((data) => {
      if (data.resultCode === 0) {
        dispatch(
          setAuthUserData({
            id: undefined,
            login: undefined,
            email: undefined,
            isAuth: false,
          })
        );
      }
    });
  };
};

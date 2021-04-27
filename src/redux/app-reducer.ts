import { Action, Dispatch, State } from "./redux-store";
import { getUserAuthorisation } from "./auth-reducer";

let initialState = {
  initialized: false,
};

export const appReducer = (
  state: State["app"] = initialState,
  action: Action
) => {
  switch (action.type) {
    case "INITIALIZED_SUCCESS":
      return {
        ...state,
        initialized: true,
      };
    default:
      return state;
  }
};

export const initializedSuccess = () =>
  ({
    type: "INITIALIZED_SUCCESS",
  } as const);

export const initialiseApp = () => {
  return (dispatch: Dispatch) => {
    // @ts-expect-error
    let promise = dispatch(getUserAuthorisation());
    // @ts-expect-error
    promise.then(() => {
      dispatch(initializedSuccess());
    });
  };
};

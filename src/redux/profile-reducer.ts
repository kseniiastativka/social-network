import {
  Action,
  Dispatch,
  ProfilePage,
  ProfileType,
  State,
} from "./redux-store";
import { profileAPI } from "../api/api";

let initialState = {
  posts: [
    { id: 1, message: "Miss me?", likesCount: 12 },
    { id: 2, message: "I have a vacation soon!", likesCount: 34 },
    { id: 3, message: "I want banana bread", likesCount: 7 },
  ],
  newPostText: "test",
  profile: undefined,
  status: "",
};

export const profileReducer = (
  state: State["profilePage"] = initialState,
  action: Action
): State["profilePage"] => {
  switch (action.type) {
    case "ADD-POST": {
      let newPost = {
        id: 5,
        message: state.newPostText,
        likesCount: 0,
      };
      return { ...state, posts: [...state.posts, newPost], newPostText: "" };
    }
    case "UPDATE-NEW-POST": {
      return { ...state, newPostText: action.text };
    }
    case "SET-USER-PROFILE": {
      return { ...state, profile: action.profile };
    }
    case "SET-USER-STATUS": {
      return { ...state, status: action.status };
    }
    default:
      return state;
  }
};

export const addPostActionCreator = () => ({ type: "ADD-POST" } as const);
export const setUserProfile = (profile: ProfileType) =>
  ({ type: "SET-USER-PROFILE", profile } as const);
export const updateNewPostActionCreator = (text: string) =>
  ({
    type: "UPDATE-NEW-POST",
    text: text,
  } as const);

export const setUserStatus = (status: ProfilePage["status"]) =>
  ({ type: "SET-USER-STATUS", status } as const);

export const getUserProfile = (userId: string) => {
  return (dispatch: Dispatch) => {
    if (!userId) {
      userId = "16447";
    }
    profileAPI.getUserProfile(userId).then((data) => {
      dispatch(setUserProfile(data));
    });
  };
};

export const getUserStatus = (userId: string) => {
  return (dispatch: Dispatch) => {
    if (!userId) {
      userId = "16447";
    }
    profileAPI.getUserStatus(userId).then((data) => {
      dispatch(setUserStatus(data));
    });
  };
};

export const updateUserStatus = (status: string) => {
  return (dispatch: Dispatch) => {
    profileAPI.updateUserStatus(status).then((data) => {
      if (data.resultCode === 0) {
        dispatch(setUserStatus(status));
      }
    });
  };
};

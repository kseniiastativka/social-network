import {
  Action,
  Dispatch,
  ProfilePage,
  ProfileType,
  State,
} from "./redux-store";
import { profileAPI } from "../api/api";

const initialState = {
  posts: [
    { id: 1, message: "Miss me?", likesCount: 12 },
    { id: 2, message: "I have a vacation soon!", likesCount: 34 },
    { id: 3, message: "I want banana bread", likesCount: 7 },
  ],
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
        message: action.text,
        likesCount: 0,
      };
      return { ...state, posts: [...state.posts, newPost] };
    }
    case "SET-USER-PROFILE": {
      return { ...state, profile: action.profile };
    }
    case "SET-USER-STATUS": {
      return { ...state, status: action.status };
    }
    case "SAVE-PHOTO-SUCCESS": {
      if (state.profile === undefined) {
        return state;
      }

      return { ...state, profile: { ...state.profile, photos: action.photos } };
    }
    default:
      return state;
  }
};

export const addPostActionCreator = (message: string) =>
  ({ type: "ADD-POST", text: message } as const);
export const setUserProfile = (profile: ProfileType) =>
  ({ type: "SET-USER-PROFILE", profile } as const);

export const setUserStatus = (status: ProfilePage["status"]) =>
  ({ type: "SET-USER-STATUS", status } as const);

export const savePhotoSuccess = (photos: Record<"large" | "small", string>) =>
  ({ type: "SAVE-PHOTO-SUCCESS", photos } as const);

export const getUserProfile = (userId: string) => async (
  dispatch: Dispatch
) => {
  const responce = await profileAPI.getUserProfile(userId);
  if (!userId) {
    userId = "16447";
  }
  dispatch(setUserProfile(responce));
};

export const getUserStatus = (userId: string) => async (dispatch: Dispatch) => {
  const response = await profileAPI.getUserStatus(userId);
  if (!userId) {
    userId = "16447";
  }
  dispatch(setUserStatus(response));
};

export const updateUserStatus = (status: string) => async (
  dispatch: Dispatch
) => {
  const response = await profileAPI.updateUserStatus(status);
  if (response.resultCode === 0) {
    dispatch(setUserStatus(status));
  }
};

export const savePhoto = (file: File) => async (dispatch: Dispatch) => {
  const response = await profileAPI.savePhoto(file);
  if (response.resultCode === 0) {
    dispatch(savePhotoSuccess(response.data.photos));
  }
};

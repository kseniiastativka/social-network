import { Action, State } from "./redux-store";

let initialState = {
  posts: [
    { id: 1, message: "Miss me?", likesCount: 12 },
    { id: 2, message: "I have a vacation soon!", likesCount: 34 },
    { id: 3, message: "I want banana bread", likesCount: 7 },
  ],
  newPostText: "test",
};

export const profileReducer = (
  state: State["profilePage"] = initialState,
  action: Action
) => {
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
    default:
      return state;
  }
};

export const addPostActionCreator = () => ({ type: "ADD-POST" } as const);
export const updateNewPostActionCreator = (text: string) =>
  ({
    type: "UPDATE-NEW-POST",
    text: text,
  } as const);

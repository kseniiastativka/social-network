import { Action, State } from "./state";

export const profileReducer = (state: State["profilePage"], action: Action) => {
  switch (action.type) {
    case "ADD-POST":
      let newPost = {
        id: 5,
        message: state.newPostText,
        likesCount: 0,
      };
      state.posts.push(newPost);
      state.newPostText = "";
      break;
    case "UPDATE-NEW-POST":
      state.newPostText = action.text;
      break;
    default:
      return state;
  }
  return state;
};

export const addPostActionCreator = () => ({ type: "ADD-POST" } as const);
export const updateNewPostActionCreator = (text: string) =>
  ({
    type: "UPDATE-NEW-POST",
    text: text,
  } as const);

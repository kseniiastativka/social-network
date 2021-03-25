import ReactDOM from "react-dom";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import {
  addPost,
  sendMessage,
  updateNewMessageText,
  updateNewPostText,
} from "./redux/state";

export let rerenderEntireTree = (state: {
  profilePage: {
    posts: { message: string; likesCount: number }[];
    newPostText: string;
  };
  dialogsPage: {
    dialogs: { id: number; name: string; img: string }[];
    messages: { id: number; message: string }[];
    newMessageText: string;
  };
  navbar: {
    friends: { id: number; name: string; img: string }[];
  };
}) => {
  ReactDOM.render(
    <React.StrictMode>
      <BrowserRouter>
        <App
          state={state}
          addPosts={addPost}
          updateNewPostText={updateNewPostText}
          updateNewMessageText={updateNewMessageText}
          sendMessage={sendMessage}
        />
      </BrowserRouter>
    </React.StrictMode>,
    document.getElementById("root")
  );
};

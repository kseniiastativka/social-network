import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

let posts = [
  { id: 1, message: "Miss me?", likesCount: 12 },
  { id: 2, message: "I have a vacation soon!", likesCount: 34 },
  { id: 3, message: "I want banana bread", likesCount: 7 },
];
let dialogs = [
  { id: 1, name: "Zenya" },
  { id: 2, name: "Ira" },
  { id: 3, name: "Anna" },
  { id: 4, name: "Sasha" },
];

let messages = [
  { id: 1, message: "Hi" },
  { id: 2, message: "Yo" },
  { id: 3, message: "What's up?" },
];

ReactDOM.render(
  <React.StrictMode>
    <App posts={posts} dialogs={dialogs} messages={messages} />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

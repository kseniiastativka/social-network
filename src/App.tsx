import "./App.css";
import React from "react";
import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import Profile from "./components/Profile/Profile";
import Dialogs from "./components/Dialogs/Dialogs";
import { Route } from "react-router-dom";
import News from "./components/News/News";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";

const App = (props: {
  state: {
    profilePage: { posts: { message: string; likesCount: number }[] };
    dialogsPage: {
      dialogs: { id: number; name: string; img: string }[];
      messages: { id: number; message: string }[];
    };
    navbar: {
      friends: { id: number; name: string; img: string }[];
    };
  };
  addPosts: (post: string) => void;
}) => {
  return (
    <div className="app-wrapper">
      <Header />
      <Navbar state={props.state.navbar} />
      <div className="app-wrapper-content">
        <Route
          path="/dialogs"
          render={() => <Dialogs state={props.state.dialogsPage} />}
        />
        <Route
          path="/profile"
          render={() => (
            <Profile
              state={props.state.profilePage}
              addPosts={props.addPosts}
            />
          )}
        />
        <Route path="/news" render={() => <News />} />
        <Route path="/music" render={() => <Music />} />
        <Route path="/settings" render={() => <Settings />} />
      </div>
    </div>
  );
};
export default App;

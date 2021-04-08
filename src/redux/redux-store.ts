import { combineReducers, createStore } from "redux";
import { profileReducer } from "./profile-reducer";
import { dialogsReducer } from "./dialogs-reducer";
import { navbarReducer } from "./navbar-reducer";
import { usersReducer } from "./users-reducer";

let reducers = combineReducers({
  profilePage: profileReducer,
  dialogsPage: dialogsReducer,
  navbar: navbarReducer,
  usersPage: usersReducer,
});

let store = createStore(reducers);

export type Store = typeof store;
export type Dispatch = Store["dispatch"];

export default store;

export type Action =
  | { type: "ADD-POST" }
  | { type: "UPDATE-NEW-POST"; text: string }
  | { type: "SEND-MESSAGE" }
  | { type: "UPDATE-NEW-MESSAGE-TEXT"; text: string }
  | { type: "FOLLOW"; userId: number }
  | { type: "UNFOLLOW"; userId: number }
  | { type: "SET_USERS"; users: User[] }
  | { type: "SET_CURRENT_PAGE"; currentPage: number }
  | { type: "SET_TOTAL_USERS_COUNT"; totalUsersCount: number }
  | { type: "TOGGLE_IS_FETCHING"; isFetching: boolean }
  | { type: "SET-USER-PROFILE"; profile: ProfileType };

export interface Post {
  id: number;
  message: string;
  likesCount: number;
}

export interface ProfilePage {
  posts: Post[];
  newPostText: string;
  profile: ProfileType | undefined;
}

export interface Message {
  id: number;
  message: string;
}

export interface Dialog {
  id: number;
  name: string;
  img: string;
}

export interface DialogsPage {
  messages: Message[];
  dialogs: Dialog[];
  newMessageText: string;
}

export interface Friend {
  id: number;
  name: string;
  img: string;
}

export interface Navbar {
  friends: Friend[];
}

export interface Users {
  users: User[];
  pageSize: number;
  totalUsersCount: number;
  currentPage: number;
  isFetching: boolean;
}

export interface User {
  id: number;
  photos: { small: string; large: string };
  followed: boolean;
  name: string;
  status: string;
  location: {
    city: string;
    country: string;
  };
}

export interface ProfileType {
  fullName: string;
  aboutMe: string;
  lookingForAJob: boolean;
  photos: { small: string; large: string };
}

export interface State {
  profilePage: ProfilePage;
  dialogsPage: DialogsPage;
  navbar: Navbar;
  usersPage: Users;
}

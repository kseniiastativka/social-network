import { profileReducer } from "./profile-reducer";
import { dialogsReducer } from "./dialogs-reducer";
import { navbarReducer } from "./navbar-reducer";
import { Action, State } from "./redux-store";

const state = {
  profilePage: {
    posts: [
      { id: 1, message: "Miss me?", likesCount: 12 },
      { id: 2, message: "I have a vacation soon!", likesCount: 34 },
      { id: 3, message: "I want banana bread", likesCount: 7 },
    ],
    newPostText: "test",
  },
  dialogsPage: {
    messages: [
      {
        id: 1,
        message: "Hi",
      },
      {
        id: 2,
        message: "Yo",
      },
      {
        id: 3,
        message: "What's up?",
      },
    ],
    dialogs: [
      {
        id: 1,
        name: "Zenya",
        img:
          "https://i.guim.co.uk/img/media/8a13052d4db7dcd508af948e5db7b04598e03190/0_294_5616_3370/master/5616.jpg?width=620&quality=45&auto=format&fit=max&dpr=2&s=1ce2b85f52017f7dc517a86b848991b3",
      },
      {
        id: 2,
        name: "Ira",
        img:
          "https://i.natgeofe.com/n/4f5aaece-3300-41a4-b2a8-ed2708a0a27c/domestic-dog_thumb.jpg?w=272&h=272",
      },
      {
        id: 3,
        name: "Anna",
        img:
          "https://cdn.shopify.com/s/files/1/1529/9657/articles/Blog_Post_Header_81.jpg?v=1579105473",
      },
      {
        id: 4,
        name: "Sasha",
        img:
          "https://internationaltreefoundation.org/wp-content/uploads/2016/05/tree-576848_1280.png",
      },
    ],
    newMessageText: "",
  },
  navbar: {
    friends: [
      {
        id: 1,
        name: "Zenya",
        img:
          "https://i.guim.co.uk/img/media/8a13052d4db7dcd508af948e5db7b04598e03190/0_294_5616_3370/master/5616.jpg?width=620&quality=45&auto=format&fit=max&dpr=2&s=1ce2b85f52017f7dc517a86b848991b3",
      },
      {
        id: 2,
        name: "Ira",
        img:
          "https://i.natgeofe.com/n/4f5aaece-3300-41a4-b2a8-ed2708a0a27c/domestic-dog_thumb.jpg?w=272&h=272",
      },
      {
        id: 3,
        name: "Anna",
        img:
          "https://cdn.shopify.com/s/files/1/1529/9657/articles/Blog_Post_Header_81.jpg?v=1579105473",
      },
    ],
  },
};

let store = {
  rerenderEntireTree: (state: State) => {},

  dispatch(action: Action) {
    state.profilePage = profileReducer(state.profilePage, action);
    state.dialogsPage = dialogsReducer(state.dialogsPage, action);
    state.navbar = navbarReducer(state.navbar, action);
    store.rerenderEntireTree(state);
  },

  getState() {
    return store;
  },

  subscribe(observer: (state: State) => unknown) {
    store.rerenderEntireTree = observer;
  },
};

export default store;

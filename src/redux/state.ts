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

export type Action =
  | { type: "ADD-POST" }
  | { type: "UPDATE-NEW-POST"; text: string }
  | { type: "SEND-MESSAGE" }
  | { type: "UPDATE-NEW-MESSAGE-TEXT"; text: string };

let store = {
  rerenderEntireTree: (state: State) => {},

  dispatch(action: Action) {
    if (action.type === "ADD-POST") {
      let newPost = {
        id: 5,
        message: state.profilePage.newPostText,
        likesCount: 0,
      };
      state.profilePage.posts.push(newPost);
      state.profilePage.newPostText = "";
      store.rerenderEntireTree(state);
    } else if (action.type === "UPDATE-NEW-POST") {
      state.profilePage.newPostText = action.text;
      store.rerenderEntireTree(state);
    } else if (action.type === "SEND-MESSAGE") {
      let newMessage = {
        id: 4,
        message: state.dialogsPage.newMessageText,
      };
      state.dialogsPage.messages.push(newMessage);
      state.dialogsPage.newMessageText = "";
      store.rerenderEntireTree(state);
    } else if (action.type === "UPDATE-NEW-MESSAGE-TEXT") {
      state.dialogsPage.newMessageText = action.text;
      store.rerenderEntireTree(state);
    }
  },

  getState() {
    return state;
  },

  updateNewMessageText(newMessage: string) {
    state.dialogsPage.newMessageText = newMessage;
    store.rerenderEntireTree(state);
  },

  subscribe(observer: (state: State) => unknown) {
    store.rerenderEntireTree = observer;
  },
};

export type State = typeof state;

export default store;

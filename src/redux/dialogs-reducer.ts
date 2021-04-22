import { Action, DialogsPage } from "./redux-store";

let initialState = {
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
};

export const dialogsReducer = (
  state: DialogsPage = initialState,
  action: Action
) => {
  switch (action.type) {
    case "SEND-MESSAGE":
      return {
        ...state,
        newMessageText: "",
        messages: [...state.messages, { id: 4, message: action.text }],
      };
    default:
      return state;
  }
};

export const sendMessageActionCreator = (message: string) =>
  ({ type: "SEND-MESSAGE", text: message } as const);

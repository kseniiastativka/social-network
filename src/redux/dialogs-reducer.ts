import { Action, State } from "./state";

export const dialogsReducer = (state: State["dialogsPage"], action: Action) => {
  switch (action.type) {
    case "SEND-MESSAGE":
      let newMessage = {
        id: 4,
        message: state.newMessageText,
      };
      state.messages.push(newMessage);
      state.newMessageText = "";
      break;
    case "UPDATE-NEW-MESSAGE-TEXT":
      state.newMessageText = action.text;
      break;
    default:
      return state;
  }
  return state;
};

export const sendMessageActionCreator = () =>
  ({ type: "SEND-MESSAGE" } as const);
export const updateNewMessageTextActionCreator = (message: string) =>
  ({ type: "UPDATE-NEW-MESSAGE-TEXT", text: message } as const);

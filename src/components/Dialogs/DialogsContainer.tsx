import React from "react";
import {
  sendMessageActionCreator,
  updateNewMessageTextActionCreator,
} from "../../redux/dialogs-reducer";
import Dialogs from "./Dialogs";
import { Store } from "../../redux/redux-store";
import StoreContext from "../../StoreContext";

const DialogsContainer = () => {
  return (
    <StoreContext.Consumer>
      {(store) => {
        if (store === null) {
          return null;
        }
        let state = store.getState().dialogsPage;

        let sendMessage = () => {
          store.dispatch(sendMessageActionCreator());
        };

        let onMessageUpdate = (message: string) => {
          store.dispatch(updateNewMessageTextActionCreator(message));
        };
        return (
          <Dialogs
            updateNewMessageText={onMessageUpdate}
            sendMessage={sendMessage}
            dialogsPage={state}
          />
        );
      }}
    </StoreContext.Consumer>
  );
};

export default DialogsContainer;

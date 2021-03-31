import React from "react";
import {
  sendMessageActionCreator,
  updateNewMessageTextActionCreator,
} from "../../redux/dialogs-reducer";
import Dialogs from "./Dialogs";
import { Store } from "../../redux/redux-store";

const DialogsContainer = (props: { store: Store }) => {
  let state = props.store.getState().dialogsPage;

  let sendMessage = () => {
    props.store.dispatch(sendMessageActionCreator());
  };

  let onMessageUpdate = (message: string) => {
    props.store.dispatch(updateNewMessageTextActionCreator(message));
  };

  return (
    <Dialogs
      updateNewMessageText={onMessageUpdate}
      sendMessage={sendMessage}
      dialogsPage={state}
    />
  );
};

export default DialogsContainer;

import s from "./Dialogs.module.css";
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import React, { ChangeEvent } from "react";
import { State } from "../../redux/redux-store";

export interface DialogProps {
  updateNewMessageText: (message: string) => void;
  sendMessage: () => void;
  dialogsPage: State["dialogsPage"];
}
const Dialogs = (props: DialogProps) => {
  let dialogElements = props.dialogsPage.dialogs.map((dialog) => (
    <DialogItem
      name={dialog.name}
      key={dialog.id}
      id={dialog.id}
      img={dialog.img}
    />
  ));

  let messageElements = props.dialogsPage.messages.map((message) => (
    <Message message={message.message} key={message.id} />
  ));

  let sendMessage = () => {
    props.sendMessage();
  };

  let onMessageUpdate = (e: ChangeEvent<HTMLTextAreaElement>) => {
    let message = e.target.value;
    props.updateNewMessageText(message);
  };

  return (
    <div className={s.dialogs}>
      <div className={s.dialogsItems}>{dialogElements}</div>
      <div className={s.messages}>
        {messageElements}
        <textarea
          onChange={onMessageUpdate}
          value={props.dialogsPage.newMessageText}
        />
        <div>
          <button onClick={sendMessage}>Send message</button>
        </div>
      </div>
    </div>
  );
};

export default Dialogs;

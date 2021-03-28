import s from "./Dialogs.module.css";
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import React, { ChangeEvent } from "react";
import {
  Action,
  sendMessageActionCreator,
  updateNewMessageTextActionCreator,
} from "../../redux/state";

const Dialogs = (props: {
  state: {
    dialogs: { id: number; name: string; img: string }[];
    messages: { id: number; message: string }[];
    newMessageText: string;
  };
  dispatch: (action: Action) => void;
}) => {
  let dialogElements = props.state.dialogs.map((dialog) => (
    <DialogItem name={dialog.name} id={dialog.id} img={dialog.img} />
  ));

  let messageElements = props.state.messages.map((message) => (
    <Message message={message.message} />
  ));

  let sendMessage = () => {
    props.dispatch(sendMessageActionCreator());
  };

  let onMessageUpdate = (e: ChangeEvent<HTMLTextAreaElement>) => {
    let message = e.target.value;
    props.dispatch(updateNewMessageTextActionCreator(message));
  };

  return (
    <div className={s.dialogs}>
      <div className={s.dialogsItems}>{dialogElements}</div>
      <div className={s.messages}>
        {messageElements}
        <textarea
          onChange={onMessageUpdate}
          value={props.state.newMessageText}
        />
        <div>
          <button onClick={sendMessage}>Send message</button>
        </div>
      </div>
    </div>
  );
};

export default Dialogs;
